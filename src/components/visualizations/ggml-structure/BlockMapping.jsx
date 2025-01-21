import React from 'react';

const WeightBlock = ({ value, isHighlighted }) => (
  <div className={`flex flex-col items-center ${isHighlighted ? 'scale-105 transform' : ''}`}>
    <div className={`h-10 w-16 ${isHighlighted ? 'bg-blue-200 dark:bg-blue-800' : 'bg-blue-50 dark:bg-blue-900/50'} 
                    border border-gray-400 dark:border-gray-600 rounded flex items-center justify-center text-xs dark:text-gray-200`}>
      {value}
    </div>
  </div>
);

const QuantizedBlock = ({ value, bits, scale, color = "bg-green-50", showBitPacking = false }) => {
  // Convert light mode colors to include dark mode variants
  const colorMap = {
    "bg-green-50": "bg-green-50 dark:bg-green-900/50",
    "bg-yellow-50": "bg-yellow-50 dark:bg-yellow-900/50",
    "bg-red-50": "bg-red-50 dark:bg-red-900/50",
    "bg-purple-50": "bg-purple-50 dark:bg-purple-900/50"
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`h-10 w-16 ${colorMap[color]} border border-gray-400 dark:border-gray-600 rounded flex items-center justify-center text-xs dark:text-gray-200`}>
        {value}
      </div>
      <span className="text-xs mt-1 dark:text-gray-300">{bits}-bit</span>
      {scale && <span className="text-xs text-gray-600 dark:text-gray-400">×{scale}</span>}
      {showBitPacking && (
        <div className="flex gap-1 mt-1">
          {[...Array(parseInt(bits))].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
          ))}
        </div>
      )}
    </div>
  );
};

const BlockStructure = ({ title, description, children }) => (
  <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
    <div>
      <h3 className="text-lg font-semibold dark:text-gray-200">{title}</h3>
      {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
    </div>
    {children}
  </div>
);

const BlockMapping = () => {
  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        {/* <h2 className="text-2xl font-bold dark:text-gray-100">Complete GGML Block Structures</h2> */}
      </div>
      {/* <div className="p-6 space-y-8"> */}
        {/* Q8_0 Block Structure */}
        <BlockStructure 
          title="Q8_0 Block Structure (34 bytes)"
          description="Basic block with highest precision">
          <div className="flex gap-4">
            <div className="w-32 bg-blue-100 dark:bg-blue-900/50 p-4 rounded">
              <div className="text-sm font-medium dark:text-gray-200">Block Header</div>
              <div className="text-xs mt-2 dark:text-gray-300">
                • d (scale) - FP16
                <br />
                • 2 bytes
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded">
                <div className="text-sm font-medium dark:text-gray-200">32 Quantized Values (8-bit each = 32 bytes)</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <QuantizedBlock 
                      key={i}
                      value={`q${i}`}
                      bits="8"
                      scale="d"
                      showBitPacking={true}
                    />
                  ))}
                  <span className="text-sm self-center">... (32 total values)</span>
                </div>
                <div className="text-xs mt-4 bg-blue-50 p-2 rounded">
                  Range: [-128 → 127] signed integer
                </div>
              </div>
            </div>
          </div>
        </BlockStructure>

        {/* Q4_K_M Superblock Structure */}
        <BlockStructure 
          title="Q4_K_M Superblock Structure (160 bytes)"
          description="Advanced structure with separate scales and minimums for better accuracy">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-100 p-4 rounded">
                <div className="text-sm font-medium">8 Block Scales (16 bytes)</div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="text-xs bg-purple-50 p-2 rounded text-center">
                      scale_{i}
                      <br />
                      (FP16)
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-indigo-100 p-4 rounded">
                <div className="text-sm font-medium">8 Block Minimums (16 bytes)</div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="text-xs bg-indigo-50 p-2 rounded text-center">
                      min_{i}
                      <br />
                      (FP16)
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-blue-100 p-4 rounded">
              <div className="text-sm font-medium">256 Quantized Values (4-bit each = 128 bytes)</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {[...Array(12)].map((_, i) => (
                  <QuantizedBlock 
                    key={i}
                    value={`q${i}`}
                    bits="4"
                    scale={`s${Math.floor(i/32)}`}
                    showBitPacking={true}
                  />
                ))}
                <span className="text-sm self-center">... (256 total values)</span>
              </div>
              <div className="text-xs mt-4 bg-blue-50 p-2 rounded">
                Range: [0 → 15] unsigned integer
              </div>
            </div>
          </div>
        </BlockStructure>

        {/* Q3_K_S Block Structure */}
        <BlockStructure 
          title="Q3_K_S Block Structure (14 bytes)"
          description="Simple 3-bit quantization with scaling">
          <div className="flex gap-4">
            <div className="w-32 bg-yellow-100 p-4 rounded">
              <div className="text-sm font-medium">Block Header</div>
              <div className="text-xs mt-2">
                • scale (FP16)
                <br />
                • 2 bytes
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-yellow-100 p-4 rounded">
                <div className="text-sm font-medium">32 Quantized Values (3-bit each = 12 bytes)</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <QuantizedBlock 
                      key={i}
                      value={`q${i}`}
                      bits="3"
                      scale="scale"
                      color="bg-yellow-50"
                      showBitPacking={true}
                    />
                  ))}
                  <span className="text-sm self-center">... (32 total values)</span>
                </div>
                <div className="text-xs mt-4 bg-yellow-50 p-2 rounded">
                  Range: [-4 → 3] signed integer, packed bits
                </div>
              </div>
            </div>
          </div>
        </BlockStructure>

        {/* Q3_K_L Block Structure */}
        <BlockStructure 
          title="Q3_K_L Block Structure (16 bytes)"
          description="3-bit quantization with lookup table optimization">
          <div className="flex gap-4">
            <div className="w-32 bg-red-100 p-4 rounded">
              <div className="text-sm font-medium">Block Headers</div>
              <div className="text-xs mt-2">
                • scale (FP16)
                <br />
                • lookup (FP16)
                <br />
                • 4 bytes total
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-red-100 p-4 rounded">
                <div className="text-sm font-medium">32 Quantized Values (3-bit each = 12 bytes)</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <QuantizedBlock 
                      key={i}
                      value={`q${i}`}
                      bits="3"
                      scale="scale+lut"
                      color="bg-red-50"
                      showBitPacking={true}
                    />
                  ))}
                  <span className="text-sm self-center">... (32 total values)</span>
                </div>
                <div className="text-xs mt-4 bg-red-50 p-2 rounded">
                  Range: [-4 → 3] with lookup table mapping
                </div>
              </div>
            </div>
          </div>
        </BlockStructure>

        {/* Q5_K_M Block Structure */}
        <BlockStructure 
          title="Q5_K_M Block Structure (22 bytes)"
          description="5-bit quantization with block minimum">
          <div className="flex gap-4">
            <div className="w-32 bg-green-100 p-4 rounded">
              <div className="text-sm font-medium">Block Headers</div>
              <div className="text-xs mt-2">
                • scale (FP16)
                <br />
                • min (FP16)
                <br />
                • 4 bytes total
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-green-100 p-4 rounded">
                <div className="text-sm font-medium">32 Quantized Values (5-bit each = 20 bytes)</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <QuantizedBlock 
                      key={i}
                      value={`q${i}`}
                      bits="5"
                      scale="scale"
                      color="bg-green-50"
                      showBitPacking={true}
                    />
                  ))}
                  <span className="text-sm self-center">... (32 total values)</span>
                </div>
                <div className="text-xs mt-4 bg-green-50 p-2 rounded">
                  Range: [0 → 31] unsigned with minimum offset
                </div>
              </div>
            </div>
          </div>
        </BlockStructure>

        {/* Q5_1 Block Structure */}
        <BlockStructure 
          title="Q5_1 Block Structure (22 bytes)"
          description="5-bit quantization with zero-point optimization">
          <div className="flex gap-4">
            <div className="w-32 bg-purple-100 p-4 rounded">
              <div className="text-sm font-medium">Block Headers</div>
              <div className="text-xs mt-2">
                • scale (FP16)
                <br />
                • zero-point (FP16)
                <br />
                • 4 bytes total
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-purple-100 p-4 rounded">
                <div className="text-sm font-medium">32 Quantized Values (5-bit each = 20 bytes)</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <QuantizedBlock 
                      key={i}
                      value={`q${i}`}
                      bits="5"
                      scale="scale"
                      color="bg-purple-50"
                      showBitPacking={true}
                    />
                  ))}
                  <span className="text-sm self-center">... (32 total values)</span>
                </div>
                <div className="text-xs mt-4 bg-purple-50 p-2 rounded">
                  Range: [0 → 31] with zero-point adjustment
                </div>
              </div>
            </div>
          </div>
        </BlockStructure>

        {/* Memory Usage Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">Memory Layout Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="font-medium dark:text-gray-200">8-bit Format</div>
              <ul className="text-xs space-y-1 dark:text-gray-300">
                <li>• Q8_0: 34 bytes total</li>
                <li>• 2B header + 32B data</li>
                <li>• [-128 → 127] range</li>
                <li>• w = q × d</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium">4/5-bit Formats</div>
              <ul className="text-xs space-y-1">
                <li>• Q4_K_M: 160B superblock</li>
                <li>• Q5_K_M: 22B block</li>
                <li>• Q5_1: 22B block</li>
                <li>• w = q × scale + min/zero</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium">3-bit Formats</div>
              <ul className="text-xs space-y-1">
                <li>• Q3_K_S: 14B simple</li>
                <li>• Q3_K_L: 16B with LUT</li>
                <li>• [-4 → 3] range</li>
                <li>• w = q × scale (or LUT)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default BlockMapping;