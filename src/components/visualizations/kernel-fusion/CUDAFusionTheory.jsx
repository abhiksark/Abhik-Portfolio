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
      <div className="grid grid-cols-2 gap-1 bg-gray-100 dark:bg-gray-800 p-2 rounded">
        {data.map((value, idx) => (
          <div key={idx} className="text-xs bg-white dark:bg-gray-700 p-1 rounded shadow-sm dark:text-gray-200">
            {value}
          </div>
        ))}
      </div>
      {!isLast && <ArrowRight className="text-gray-400 dark:text-gray-500" size={16} />}
    </div>
  );

  const MemoryAccessPattern = ({ showCoalesced }) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-3 md:p-4 rounded-lg">
      <h3 className="text-sm font-semibold mb-2 dark:text-gray-200">Memory Access Pattern</h3>
      {showCoalesced ? (
        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <div className="w-full md:w-2/5 min-h-[32px] bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded flex items-center justify-center text-xs p-1 text-center break-words dark:text-blue-100">
              <span className="inline-block">Thread Block (32 threads)</span>
            </div>
            <ArrowRight className="text-blue-500 dark:text-blue-400 rotate-90 md:rotate-0 shrink-0" size={20} />
            <div className="w-full md:w-3/5 min-h-[32px] bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded flex items-center justify-center text-xs p-1 text-center break-words dark:text-green-100">
              <span className="inline-block">128-byte Memory Transaction</span>
            </div>
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
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
                <div className="w-full md:w-24 h-6 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded flex items-center justify-center text-xs shrink-0 dark:text-blue-100">
                  8 Threads
                </div>
                <ArrowRight className="text-red-500 dark:text-red-400 rotate-90 md:rotate-0 shrink-0" size={16} />
                <div className="w-full md:flex-1 min-h-[24px] bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded flex items-center justify-center text-xs px-1 text-center break-words dark:text-red-100">
                  <span className="inline-block">32-byte Scattered Memory Access</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400 font-medium">
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
      <div className={`p-2 rounded ${color} ${isMemoryOp ? 'border-2 border-dashed border-gray-400 dark:border-gray-600' : ''}`}>
        <div className="text-xs font-medium mb-1 dark:text-gray-200">{title}</div>
        <div className="text-sm font-bold dark:text-gray-100">{value}</div>
        {isMemoryOp && <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">Global Memory</div>}
      </div>
    );

    const DataPath = () => (
      <div className="flex items-center justify-center">
        <ArrowRight className="text-gray-400 dark:text-gray-500" size={16} />
      </div>
    );

    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <h4 className="font-medium dark:text-gray-200">Example with input value: 3</h4>
          <button
            onClick={() => setIsFused(!isFused)}
            className={`w-full md:w-auto px-4 py-2 rounded ${isFused ? 'bg-green-500 dark:bg-green-600 text-white' : 'bg-blue-500 dark:bg-blue-600 text-white'
              }`}
          >
            {isFused ? 'Show Separate Kernels' : 'Show Fused Kernel'}
          </button>
        </div>

        {!isFused ? (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
              <OperationBox title="Input" value="3" color="bg-gray-100 dark:bg-gray-800" isMemoryOp={true} />
              <DataPath />
              <OperationBox title="Scale (×2)" value="6" color="bg-blue-100 dark:bg-blue-900/50" />
              <DataPath />
              <OperationBox title="Store" value="6" color="bg-gray-100 dark:bg-gray-800" isMemoryOp={true} />
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
              <OperationBox title="Load" value="6" color="bg-gray-100 dark:bg-gray-800" isMemoryOp={true} />
              <DataPath />
              <OperationBox title="ReLU" value="6" color="bg-green-100 dark:bg-green-900/50" />
              <DataPath />
              <OperationBox title="Store" value="6" color="bg-gray-100 dark:bg-gray-800" isMemoryOp={true} />
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
              <OperationBox title="Load" value="6" color="bg-gray-100 dark:bg-gray-800" isMemoryOp={true} />
              <DataPath />
              <OperationBox title="Add (+1)" value="7" color="bg-purple-100 dark:bg-purple-900/50" />
              <DataPath />
              <OperationBox title="Final" value="7" color="bg-gray-100 dark:bg-gray-800" isMemoryOp={true} />
            </div>
            <div className="text-sm text-red-500 dark:text-red-400 mt-2">
              6 memory operations (3 loads + 3 stores)
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
              <OperationBox title="Input" value="3" color="bg-gray-100 dark:bg-gray-800" isMemoryOp={true} />
              <DataPath />
              <div className="w-full md:flex-1 space-y-2 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 dark:from-blue-900/30 dark:via-green-900/30 dark:to-purple-900/30 p-3 rounded-lg">
                <div className="text-xs font-medium dark:text-gray-200">Fused Operations (Register Only)</div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs dark:text-gray-200">3</span>
                  <ArrowRight className="text-blue-400 dark:text-blue-500" size={12} />
                  <span className="text-xs dark:text-gray-200">6</span>
                  <ArrowRight className="text-green-400 dark:text-green-500" size={12} />
                  <span className="text-xs dark:text-gray-200">6</span>
                  <ArrowRight className="text-purple-400 dark:text-purple-500" size={12} />
                  <span className="text-xs dark:text-gray-200">7</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Scale</span>
                  <span>ReLU</span>
                  <span>Add</span>
                </div>
              </div>
              <DataPath />
              <OperationBox title="Final" value="7" color="bg-gray-100 dark:bg-gray-800" isMemoryOp={true} />
            </div>
            <div className="text-sm text-green-500 dark:text-green-400 mt-2">
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
          <h3 className="text-lg font-semibold dark:text-gray-200">1. Thread Block Organization</h3>

          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Unfused Kernel Organization */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Unfused Kernels (3 Separate Launches)</h4>
              <div className="space-y-4 md:space-y-6">
                {/* Scale Kernel */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Kernel 1: Scale</div>
                  <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-2 md:p-3 bg-blue-50 dark:bg-blue-900/30">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="h-6 bg-blue-100 dark:bg-blue-800 rounded flex items-center justify-center text-xs dark:text-blue-100">
                          T{i}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-center text-blue-600 dark:text-blue-400">Thread Block (16 threads)</div>
                  </div>
                </div>

                {/* ReLU Kernel */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">Kernel 2: ReLU</div>
                  <div className="border border-green-200 dark:border-green-800 rounded-lg p-2 md:p-3 bg-green-50 dark:bg-green-900/30">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="h-6 bg-green-100 dark:bg-green-800 rounded flex items-center justify-center text-xs dark:text-green-100">
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
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Fused Kernel (Single Launch)</h4>
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4">
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 md:p-3 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 dark:from-blue-900/30 dark:via-green-900/30 dark:to-purple-900/30">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="relative h-12 rounded overflow-hidden">
                          <div className="absolute inset-0 bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-xs dark:text-blue-100">
                            Scale
                          </div>
                          <div className="absolute inset-0 bg-green-100 dark:bg-green-800 flex items-center justify-center text-xs dark:text-green-100 translate-y-4">
                            ReLU
                          </div>
                          <div className="absolute inset-0 bg-purple-100 dark:bg-purple-800 flex items-center justify-center text-xs dark:text-purple-100 translate-y-8">
                            Add
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-center text-gray-600 dark:text-gray-400">
                      Each thread executes all operations sequentially
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 dark:text-gray-400 space-y-2 md:space-y-0">
                      <span>Warp 0 (Threads 0-15)</span>
                      <span>Single SM Assignment</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-700">
                        <div className="font-medium mb-1 dark:text-gray-200">Benefits:</div>
                        <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
                          <li>Register data reuse</li>
                          <li>Single kernel launch</li>
                          <li>Reduced scheduling overhead</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-700">
                        <div className="font-medium mb-1 dark:text-gray-200">Resources:</div>
                        <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300">
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
          <h3 className="text-lg font-semibold dark:text-gray-200">3. Operation Fusion Example</h3>
          <FusionExample />
        </div>


      </div>
    </div>
  );
};

export default CUDAFusionTheory; 

