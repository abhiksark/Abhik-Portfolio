'use client'

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const CUDAFusionTheory = () => {
  const [isFused, setIsFused] = useState(false);
  
  // Example matrix data
  const inputMatrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

  // Kernel operations
  const operations = {
    scale: (x) => x * 2,
    relu: (x) => Math.max(0, x),
    add: (x) => x + 1
  };

  const ThreadBlock = ({ data, operations, isLast }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="grid grid-cols-2 gap-1 bg-gray-100 p-2 rounded">
        {data.map((value, idx) => (
          <div key={idx} className="text-xs bg-white p-1 rounded shadow-sm">
            {value}
          </div>
        ))}
      </div>
      {!isLast && <ArrowRight className="text-gray-400" size={16} />}
    </div>
  );

  const MemoryAccessPattern = ({ showCoalesced }) => (
    <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
      <h3 className="text-sm font-semibold mb-2">Memory Access Pattern</h3>
      {showCoalesced ? (
        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div className="w-full md:w-2/5 min-h-[32px] bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-xs p-1 text-center break-words">
              <span className="inline-block">Thread Block (32 threads)</span>
            </div>
            <ArrowRight className="text-blue-500 rotate-90 md:rotate-0 shrink-0" size={20} />
            <div className="w-full md:w-3/5 min-h-[32px] bg-green-100 border border-green-300 rounded flex items-center justify-center text-xs p-1 text-center break-words">
              <span className="inline-block">128-byte Memory Transaction</span>
            </div>
          </div>
          <div className="text-xs text-green-600 font-medium">
            <div className="space-y-1">
              <p>✓ Single memory transaction for 32 consecutive elements</p>
              <p>✓ Maximum memory bandwidth utilization</p>
              <p>✓ Minimal memory latency</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                <div className="w-full md:w-24 h-6 bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-xs shrink-0">
                  8 Threads
                </div>
                <ArrowRight className="text-red-500 rotate-90 md:rotate-0 shrink-0" size={16} />
                <div className="w-full md:flex-1 min-h-[24px] bg-red-100 border border-red-300 rounded flex items-center justify-center text-xs px-1 text-center break-words">
                  <span className="inline-block">32-byte Scattered Memory Access</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-red-600 font-medium">
            <div className="space-y-1">
              <p>✗ Multiple smaller memory transactions</p>
              <p>✗ Poor memory bandwidth utilization</p>
              <p>✗ Higher memory latency</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const FusionExample = () => {
    const OperationBox = ({ title, value, color, isMemoryOp }) => (
      <div className={`p-2 rounded ${color} ${isMemoryOp ? 'border-2 border-dashed border-gray-400' : ''}`}>
        <div className="text-xs font-medium mb-1">{title}</div>
        <div className="text-sm font-bold">{value}</div>
        {isMemoryOp && <div className="text-xs mt-1 text-gray-600">Global Memory</div>}
      </div>
    );

    const DataPath = () => (
      <div className="flex items-center justify-center">
        <ArrowRight className="text-gray-400" size={16} />
      </div>
    );

    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <h4 className="font-medium">Example with input value: 3</h4>
          <button
            onClick={() => setIsFused(!isFused)}
            className={`w-full md:w-auto px-4 py-2 rounded ${
              isFused ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {isFused ? 'Show Separate Kernels' : 'Show Fused Kernel'}
          </button>
        </div>

        {!isFused ? (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
              <OperationBox title="Input" value="3" color="bg-gray-100" isMemoryOp={true} />
              <DataPath />
              <OperationBox title="Scale (×2)" value="6" color="bg-blue-100" />
              <DataPath />
              <OperationBox title="Store" value="6" color="bg-gray-100" isMemoryOp={true} />
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
              <OperationBox title="Load" value="6" color="bg-gray-100" isMemoryOp={true} />
              <DataPath />
              <OperationBox title="ReLU" value="6" color="bg-green-100" />
              <DataPath />
              <OperationBox title="Store" value="6" color="bg-gray-100" isMemoryOp={true} />
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
              <OperationBox title="Load" value="6" color="bg-gray-100" isMemoryOp={true} />
              <DataPath />
              <OperationBox title="Add (+1)" value="7" color="bg-purple-100" />
              <DataPath />
              <OperationBox title="Final" value="7" color="bg-gray-100" isMemoryOp={true} />
            </div>
            <div className="text-sm text-red-500 mt-2">
              6 memory operations (3 loads + 3 stores)
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
              <OperationBox title="Input" value="3" color="bg-gray-100" isMemoryOp={true} />
              <DataPath />
              <div className="w-full md:flex-1 space-y-2 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 p-3 rounded-lg">
                <div className="text-xs font-medium">Fused Operations (Register Only)</div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs">3</span>
                  <ArrowRight className="text-blue-400" size={12} />
                  <span className="text-xs">6</span>
                  <ArrowRight className="text-green-400" size={12} />
                  <span className="text-xs">6</span>
                  <ArrowRight className="text-purple-400" size={12} />
                  <span className="text-xs">7</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Scale</span>
                  <span>ReLU</span>
                  <span>Add</span>
                </div>
              </div>
              <DataPath />
              <OperationBox title="Final" value="7" color="bg-gray-100" isMemoryOp={true} />
            </div>
            <div className="text-sm text-green-500 mt-2">
              Only 2 memory operations (1 load + 1 store)
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8">
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-lg font-semibold">1. Thread Block Organization</h3>
          
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Unfused Kernel Organization */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h4 className="text-sm font-medium text-gray-600">Unfused Kernels (3 Separate Launches)</h4>
              <div className="space-y-4 md:space-y-6">
                {/* Scale Kernel */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-blue-600">Kernel 1: Scale</div>
                  <div className="border border-blue-200 rounded-lg p-2 md:p-3 bg-blue-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="h-6 bg-blue-100 rounded flex items-center justify-center text-xs">
                          T{i}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-center text-blue-600">Thread Block (16 threads)</div>
                  </div>
                </div>

                {/* ReLU Kernel */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-green-600">Kernel 2: ReLU</div>
                  <div className="border border-green-200 rounded-lg p-2 md:p-3 bg-green-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="h-6 bg-green-100 rounded flex items-center justify-center text-xs">
                          T{i}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-center text-green-600">Thread Block (16 threads)</div>
                  </div>
                </div>

                {/* Add Kernel */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-purple-600">Kernel 3: Add</div>
                  <div className="border border-purple-200 rounded-lg p-2 md:p-3 bg-purple-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="h-6 bg-purple-100 rounded flex items-center justify-center text-xs">
                          T{i}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-center text-purple-600">Thread Block (16 threads)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fused Kernel Organization */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h4 className="text-sm font-medium text-gray-600">Fused Kernel (Single Launch)</h4>
              <div className="border-2 border-gray-200 rounded-lg p-3 md:p-4">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-2 md:p-3 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="relative h-12 rounded overflow-hidden">
                          <div className="absolute inset-0 bg-blue-100 flex items-center justify-center text-xs">
                            Scale
                          </div>
                          <div className="absolute inset-0 bg-green-100 flex items-center justify-center text-xs translate-y-4">
                            ReLU
                          </div>
                          <div className="absolute inset-0 bg-purple-100 flex items-center justify-center text-xs translate-y-8">
                            Add
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-center text-gray-600">
                      Each thread executes all operations sequentially
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 space-y-2 md:space-y-0">
                      <span>Warp 0 (Threads 0-15)</span>
                      <span>Single SM Assignment</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium mb-1">Benefits:</div>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Register data reuse</li>
                          <li>Single kernel launch</li>
                          <li>Reduced scheduling overhead</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium mb-1">Resources:</div>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Shared memory: 1 block</li>
                          <li>Registers: All ops</li>
                          <li>L1 Cache: Unified</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">2. Memory Access Patterns</h3>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="w-full lg:w-1/2">
              <MemoryAccessPattern showCoalesced={false} />
            </div>
            <div className="w-full lg:w-1/2">
              <MemoryAccessPattern showCoalesced={true} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">3. Operation Fusion Example</h3>
          <FusionExample />
        </div>

        <div className="bg-gray-50 p-3 md:p-4 rounded-lg space-y-2">
          <h3 className="font-semibold">Mathematical Properties:</h3>
          <div className="text-xs md:text-sm space-y-1">
            <p>• Fusion preserves computational equivalence: f₃(f₂(f₁(x))) ≡ f_fused(x)</p>
            <p>• Memory bandwidth utilization: (R + W)_fused &lt; Σ(R + W)_individual</p>
            <p>• Theoretical speedup: S = T_separate / T_fused ≈ (n_ops + n_sync) / (1 + 1)</p>
          </div>
        </div>

        <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Performance Implications:</h3>
          <div className="text-xs md:text-sm space-y-2">
            <p>• Reduced memory transactions: {inputMatrix.length * inputMatrix[0].length} → {inputMatrix.length * inputMatrix[0].length / 3} global loads</p>
            <p>• Register reuse: Intermediate results stored in registers instead of global memory</p>
            <p>• Improved instruction cache utilization through unified kernel execution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CUDAFusionTheory; 