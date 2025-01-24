import React, { useState } from 'react';

const BlockDetail = ({ block, onClose }) => (
  <div 
    className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm"
    onClick={onClose}
  >
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-4 sticky top-0 bg-white dark:bg-gray-800 py-2">
        <h3 className="text-base sm:text-lg font-bold dark:text-white">
          MBConv Block Details
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Dimensions */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <h4 className="font-semibold mb-2 dark:text-gray-200 text-sm sm:text-base">Dimensions</h4>
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm dark:text-gray-300">
            <div>Input channels: {block.filters}</div>
            <div>Output channels: {block.filters}</div>
            <div>Feature map: {block.width}×{block.height}</div>
            <div>Kernel size: {block.kernelSize}×{block.kernelSize}</div>
          </div>
        </div>

        {/* Block Structure */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <h4 className="font-semibold mb-2 dark:text-gray-200 text-sm sm:text-base">Block Structure</h4>
          <div className="space-y-3 text-xs sm:text-sm dark:text-gray-300">
            <div className="pl-3 border-l-2 border-blue-500">
              1. Expansion Layer
              <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 ml-2">
                • {block.filters} → {block.filters * 6} channels
                <br/>
                • 1×1 convolution
                <br/>
                • ReLU6 activation
              </div>
            </div>
            <div className="pl-3 border-l-2 border-green-500">
              2. Depthwise Convolution
              <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 ml-2">
                • {block.kernelSize}×{block.kernelSize} kernel
                <br/>
                • Stride: {block.stride}
                <br/>
                • ReLU6 activation
              </div>
            </div>
            <div className="pl-3 border-l-2 border-purple-500">
              3. SE Module
              <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 ml-2">
                • Global pooling
                <br/>
                • Reduction ratio: 24
                <br/>
                • Sigmoid activation
              </div>
            </div>
            <div className="pl-3 border-l-2 border-orange-500">
              4. Projection
              <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 ml-2">
                • {block.filters * 6} → {block.filters} channels
                <br/>
                • 1×1 convolution
                <br/>
                • Linear activation
              </div>
            </div>
          </div>
        </div>

        {/* Memory and Compute */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <h4 className="font-semibold mb-2 dark:text-gray-200 text-sm sm:text-base">Compute Statistics</h4>
          <div className="space-y-1 text-xs sm:text-sm dark:text-gray-300">
            <div>Parameters: {((block.filters * block.filters * 6 + block.kernelSize * block.kernelSize * block.filters * 6 + block.filters * 6 * block.filters) / 1000).toFixed(1)}K</div>
            <div>MACs: {((block.filters * block.filters * 6 + block.kernelSize * block.kernelSize * block.filters * 6 + block.filters * 6 * block.filters) * block.width * block.height / 1000000).toFixed(1)}M</div>
            <div>Feature Memory: {((block.filters * block.width * block.height * 4) / 1024).toFixed(1)}KB</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MBConvBlock = ({ width, height, filters, kernelSize, stride, expanded, onClick }) => (
  <div 
    className={`
      relative border-2 rounded-lg p-2 min-w-[100px] sm:min-w-[120px] 
      cursor-pointer select-none
      transform transition-all duration-150 
      hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-800
      ${expanded ? 
        'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400' : 
        'bg-white dark:bg-gray-800 border-blue-400 dark:border-blue-500'}
    `}
    onClick={() => onClick({ width, height, filters, kernelSize, stride })}
  >
    <div className="text-[10px] sm:text-xs font-mono text-center dark:text-gray-200">
      {filters}×{width}×{height}
    </div>
    <div className="text-[10px] sm:text-xs text-center text-gray-600 dark:text-gray-400">
      MBConv{expanded ? 6 : 1}
    </div>
    <div className="text-[8px] sm:text-[10px] text-center text-gray-500 dark:text-gray-400">
      {kernelSize}×{kernelSize} k{stride > 1 ? `, s${stride}` : ''}
    </div>
    <div className="text-[8px] sm:text-[10px] text-center text-blue-500 dark:text-blue-400 mt-1">
      Click for details
    </div>
  </div>
);

// Stage Component (keeping the same structure but adjusted for better mobile support)
const Stage = ({ stage, factors }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const width = Math.floor(224 * factors.resolution / stage.reduction);
  const height = width;
  const filters = Math.floor(stage.filters * factors.width);
  const blocks = Math.ceil(stage.blocks * factors.depth);

  return (
    <div className="flex flex-col items-center mb-2 sm:mb-4 p-1 sm:p-2">
      <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 dark:text-gray-200">
        Stage {stage.reduction}×
      </div>
      <div className="flex flex-col gap-1 sm:gap-2">
        {Array.from({ length: blocks }).map((_, idx) => (
          <MBConvBlock
            key={idx}
            width={width}
            height={height}
            filters={filters}
            kernelSize={stage.kernelSize}
            stride={idx === 0 ? stage.stride : 1}
            expanded={true}
            onClick={setSelectedBlock}
          />
        ))}
      </div>
      {selectedBlock && (
        <BlockDetail 
          block={selectedBlock}
          onClose={() => setSelectedBlock(null)}
        />
      )}
    </div>
  );
};

const EfficientNetVisualization = () => {
  const [scale, setScale] = useState(0);
  
  const getScalingFactors = (phi) => ({
    width: Math.pow(1.2, phi),
    depth: Math.pow(1.1, phi),
    resolution: Math.pow(1.15, phi)
  });

  const factors = getScalingFactors(scale);
  
  const baseStages = [
    { filters: 32, blocks: 1, reduction: 1, kernelSize: 3, stride: 1 },
    { filters: 16, blocks: 2, reduction: 2, kernelSize: 3, stride: 2 },
    { filters: 24, blocks: 2, reduction: 4, kernelSize: 5, stride: 2 },
    { filters: 40, blocks: 3, reduction: 8, kernelSize: 3, stride: 2 },
    { filters: 80, blocks: 3, reduction: 16, kernelSize: 5, stride: 2 },
    { filters: 112, blocks: 4, reduction: 16, kernelSize: 5, stride: 1 },
    { filters: 192, blocks: 1, reduction: 32, kernelSize: 3, stride: 2 },
    { filters: 320, blocks: 1, reduction: 32, kernelSize: 3, stride: 1 }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-lg">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 dark:text-white">
          EfficientNet CNN Architecture (B{scale})
        </h1>
        <input
          type="range"
          min="0"
          max="7"
          step="1"
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full max-w-xs sm:max-w-md mb-2"
        />
        <div className="text-sm sm:text-base md:text-lg font-semibold dark:text-gray-200">
          Compound Coefficient φ = {scale}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4 sm:mb-6">
        <div className="text-center py-2">
          <div className="font-semibold dark:text-gray-200 text-sm sm:text-base">Width Factor</div>
          <div className="font-mono dark:text-gray-300 text-sm">{factors.width.toFixed(2)}x</div>
        </div>
        <div className="text-center py-2">
          <div className="font-semibold dark:text-gray-200 text-sm sm:text-base">Depth Factor</div>
          <div className="font-mono dark:text-gray-300 text-sm">{factors.depth.toFixed(2)}x</div>
        </div>
        <div className="text-center py-2">
          <div className="font-semibold dark:text-gray-200 text-sm sm:text-base">Resolution</div>
          <div className="font-mono dark:text-gray-300 text-sm">
            {Math.round(224 * factors.resolution)}px
          </div>
        </div>
      </div>

      <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-4 p-2 sm:p-4 overflow-x-auto sm:overflow-x-visible">
        <div className="flex flex-col items-center mb-2 sm:mb-4 flex-shrink-0">
          <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 dark:text-gray-200">Input</div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-[10px] sm:text-xs font-mono dark:text-gray-300">
              {Math.round(224 * factors.resolution)}²
            </div>
          </div>
        </div>

        {baseStages.map((stage, idx) => (
          <Stage key={idx} stage={stage} factors={factors} />
        ))}

        <div className="flex flex-col items-center mb-2 sm:mb-4 flex-shrink-0">
          <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 dark:text-gray-200">Output</div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <div className="text-[10px] sm:text-xs text-center dark:text-gray-300">
              1000<br/>classes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficientNetVisualization;