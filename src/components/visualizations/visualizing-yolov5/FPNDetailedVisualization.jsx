import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Plus, ArrowRight, ZoomIn } from 'lucide-react';

const FPNDetailedVisualization = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [showDetail, setShowDetail] = useState(null);

  // Feature map with detailed view
  const FeatureMap = ({ 
    level, 
    size, 
    highlighted, 
    merging, 
    channels,
    hasDetail,
    onClick 
  }) => (
    <div 
      className={`relative cursor-pointer transition-all ${onClick ? 'hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <div className={`
        relative rounded-lg border-2 p-2 sm:p-3
        ${highlighted ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600'}
        ${merging ? 'animate-pulse' : ''}
        bg-white dark:bg-gray-800
      `}>
        <div className="text-xs sm:text-sm mb-2 flex justify-between items-center">
          <span className="font-medium dark:text-gray-200">{level}</span>
          <span className="text-gray-500 dark:text-gray-400">{channels}ch</span>
        </div>
        <div 
          className="relative aspect-square"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gridTemplateRows: `repeat(${size}, 1fr)`,
            opacity: 0.2
          }}>
          {Array(size * size).fill(null).map((_, i) => (
            <div key={i} className="border border-gray-400 dark:border-gray-600" />
          ))}
        </div>
        {hasDetail && (
          <ZoomIn className="absolute bottom-2 right-2 w-4 h-4 text-blue-500 dark:text-blue-400" />
        )}
      </div>
    </div>
  );

  // Detailed merge view component
  const DetailedMergeView = ({ type, level }) => (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg sm:text-xl font-bold mb-4 dark:text-gray-200">
          {type === 'fpn' ? 'FPN (Top-down) ' : 'PAN (Bottom-up) '}
          Merge Detail for {level}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Input Feature Maps */}
          <div className="space-y-4">
            <div className="font-bold text-center dark:text-gray-200">Input Features</div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <div className="font-semibold">Higher Level Features:</div>
                - Semantic information
                - Lower resolution
                - Deeper features
              </div>
            </div>
            <ArrowDown className="mx-auto text-blue-500 dark:text-blue-400 hidden md:block" />
            <ArrowRight className="mx-auto text-blue-500 dark:text-blue-400 md:hidden" />
            <div className="bg-green-50 dark:bg-green-900/30 p-3 sm:p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <div className="font-semibold">Current Level Features:</div>
                - Spatial details
                - Higher resolution
                - Shallower features
              </div>
            </div>
          </div>

          {/* Merge Process */}
          <div className="space-y-4">
            <div className="font-bold text-center dark:text-gray-200">Merge Operations</div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-3 sm:p-4 rounded-lg h-full border border-purple-200 dark:border-purple-800">
              <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <div className="font-semibold">1. Resolution Matching:</div>
                - Upsample higher level (FPN)
                - Or downsample lower level (PAN)
                
                <div className="font-semibold mt-4">2. Channel Adjustment:</div>
                - 1x1 convolution
                - Match feature dimensions
                
                <div className="font-semibold mt-4">3. Feature Fusion:</div>
                - Element-wise addition
                - Combine semantic & spatial info
              </div>
            </div>
          </div>

          {/* Output Features */}
          <div className="space-y-4">
            <div className="font-bold text-center dark:text-gray-200">Output Features</div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 sm:p-4 rounded-lg h-full border border-yellow-200 dark:border-yellow-800">
              <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <div className="font-semibold">Enhanced Features:</div>
                - Rich semantic information
                - Preserved spatial details
                - Multi-scale awareness
                
                <div className="font-semibold mt-4">Benefits:</div>
                - Better small object detection
                - Improved localization
                - Enhanced feature hierarchy
              </div>
            </div>
          </div>
        </div>

        <button 
          className="mt-6 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 w-full sm:w-auto"
          onClick={() => setShowDetail(null)}
        >
          Close Detail View
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold dark:text-gray-200">YOLOv5 Feature Pyramid Network - Detailed Merge Process</h2>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={() => setActiveStep(1)}
            className={`px-4 py-2 rounded ${activeStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            1. Backbone Extraction
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`px-4 py-2 rounded ${activeStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            2. FPN (Top-down)
          </button>
          <button
            onClick={() => setActiveStep(3)}
            className={`px-4 py-2 rounded ${activeStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            3. PAN (Bottom-up)
          </button>
        </div>

        {/* Main visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-7 gap-4 items-start">
          {/* Backbone Features */}
          <div className="space-y-4 col-span-2">
            <div className="text-center font-bold">Backbone Features</div>
            <FeatureMap 
              level="P5 (Stride 32)" 
              size={4}
              channels={512}
              highlighted={activeStep >= 1}
            />
            <FeatureMap 
              level="P4 (Stride 16)" 
              size={8}
              channels={256}
              highlighted={activeStep >= 1}
            />
            <FeatureMap 
              level="P3 (Stride 8)" 
              size={16}
              channels={128}
              highlighted={activeStep >= 1}
            />
          </div>

          {/* FPN Path */}
          <div className="space-y-4 col-span-2">
            <div className="text-center font-bold">FPN Features</div>
            <FeatureMap 
              level="P5" 
              size={4}
              channels={512}
              highlighted={activeStep >= 2}
              merging={activeStep === 2}
              hasDetail={activeStep >= 2}
              onClick={() => activeStep >= 2 && setShowDetail({ type: 'fpn', level: 'P5' })}
            />
            <div className="flex justify-center">
              <ArrowDown className={`w-6 h-6 ${activeStep >= 2 ? 'text-blue-500' : 'text-gray-300'}`} />
            </div>
            <FeatureMap 
              level="P4" 
              size={8}
              channels={256}
              highlighted={activeStep >= 2}
              merging={activeStep === 2}
              hasDetail={activeStep >= 2}
              onClick={() => activeStep >= 2 && setShowDetail({ type: 'fpn', level: 'P4' })}
            />
            <div className="flex justify-center">
              <ArrowDown className={`w-6 h-6 ${activeStep >= 2 ? 'text-blue-500' : 'text-gray-300'}`} />
            </div>
            <FeatureMap 
              level="P3" 
              size={16}
              channels={128}
              highlighted={activeStep >= 2}
              merging={activeStep === 2}
              hasDetail={activeStep >= 2}
              onClick={() => activeStep >= 2 && setShowDetail({ type: 'fpn', level: 'P3' })}
            />
          </div>

          {/* PAN Path */}
          <div className="space-y-4 col-span-2">
            <div className="text-center font-bold">PAN Features</div>
            <FeatureMap 
              level="P5" 
              size={4}
              channels={512}
              highlighted={activeStep >= 3}
              merging={activeStep === 3}
              hasDetail={activeStep >= 3}
              onClick={() => activeStep >= 3 && setShowDetail({ type: 'pan', level: 'P5' })}
            />
            <div className="flex justify-center">
              <ArrowUp className={`w-6 h-6 ${activeStep >= 3 ? 'text-green-500' : 'text-gray-300'}`} />
            </div>
            <FeatureMap 
              level="P4" 
              size={8}
              channels={256}
              highlighted={activeStep >= 3}
              merging={activeStep === 3}
              hasDetail={activeStep >= 3}
              onClick={() => activeStep >= 3 && setShowDetail({ type: 'pan', level: 'P4' })}
            />
            <div className="flex justify-center">
              <ArrowUp className={`w-6 h-6 ${activeStep >= 3 ? 'text-green-500' : 'text-gray-300'}`} />
            </div>
            <FeatureMap 
              level="P3" 
              size={16}
              channels={128}
              highlighted={activeStep >= 3}
              merging={activeStep === 3}
              hasDetail={activeStep >= 3}
              onClick={() => activeStep >= 3 && setShowDetail({ type: 'pan', level: 'P3' })}
            />
          </div>

          {/* Final Features */}
          <div className="space-y-4">
            <div className="text-center font-bold">Final Features</div>
            <FeatureMap 
              level="P5" 
              size={4}
              channels={512}
              highlighted={activeStep === 3}
            />
            <FeatureMap 
              level="P4" 
              size={8}
              channels={256}
              highlighted={activeStep === 3}
            />
            <FeatureMap 
              level="P3" 
              size={16}
              channels={128}
              highlighted={activeStep === 3}
            />
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg mt-6 sm:mt-8">
          <div className="font-bold mb-2">Feature Pyramid Network Details:</div>
          <div className="space-y-2 text-sm">
            {activeStep >= 1 && (
              <div>• Backbone extracts multi-scale features with increasing semantic information but decreasing spatial resolution
                   (P3: 128 channels, P4: 256 channels, P5: 512 channels)</div>
            )}
            {activeStep >= 2 && (
              <>
                <div>• FPN (Top-down) pathway:</div>
                <div className="ml-4">- Upsamples higher-level features and merges with lower levels</div>
                <div className="ml-4">- Uses 1x1 convolutions to adjust channel dimensions</div>
                <div className="ml-4">- Enhances semantic information at all scales</div>
              </>
            )}
            {activeStep >= 3 && (
              <>
                <div>• PAN (Bottom-up) pathway:</div>
                <div className="ml-4">- Downsamples and merges features in reverse direction</div>
                <div className="ml-4">- Strengthens spatial information at each level</div>
                <div className="ml-4">- Creates rich multi-scale features with both semantic and spatial awareness</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Detailed merge view modal */}
      {showDetail && <DetailedMergeView {...showDetail} />}
    </div>
  );
};

export default FPNDetailedVisualization;