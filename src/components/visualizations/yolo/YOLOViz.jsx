import React, { useState } from 'react';
import { ArrowDown, X, Info } from 'lucide-react';

const YOLOViz = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const DetailPanel = ({ details, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full m-4">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="font-bold text-lg">{details.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {details.content.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-400">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Block = ({ size, channels, label, type = "conv", showFeatures = false, details }) => (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => setSelectedComponent(details)}
        className={`
          rounded border-2 flex items-center justify-center p-2 min-w-[120px]
          transition-all duration-200 hover:shadow-lg
          ${type === 'conv' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30' : 
            type === 'pool' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-800/30' :
            'border-green-500 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-800/30'}
        `}
      >
        <div className="text-center">
          <div className="font-mono text-xs">{size}×{size}×{channels}</div>
          {label && <div className="text-[10px] text-gray-600 dark:text-gray-400 mt-1">{label}</div>}
        </div>
      </button>
      
      {showFeatures && (
        <div className="absolute -right-12 top-1/2 -translate-y-1/2">
          <div className="grid grid-cols-2 gap-0.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gray-200 dark:bg-gray-700" />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const Arrow = () => (
    <div className="flex-shrink-0 flex items-center justify-center h-8">
      <ArrowDown className="w-4 h-4 text-gray-400" />
    </div>
  );

  const PhaseIndicator = ({ title, details }) => (
    <button 
      onClick={() => setSelectedComponent(details)}
      className="relative w-full py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
    >
      <div className="absolute inset-y-0 left-0 w-1/3 border-t border-gray-300 dark:border-gray-600" />
      <div className="absolute inset-y-0 right-0 w-1/3 border-t border-gray-300 dark:border-gray-600" />
      <div className="text-center relative">
        <span className="bg-white dark:bg-gray-900 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
          {title}
        </span>
      </div>
    </button>
  );

  const GridVisualization = ({ details }) => (
    <button 
      onClick={() => setSelectedComponent(details)}
      className="relative w-48 h-48 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
    >
      <div className="absolute inset-0 grid grid-cols-7 grid-rows-7">
        {Array.from({ length: 49 }).map((_, i) => (
          <div key={i} className="relative border border-gray-300 dark:border-gray-600">
            {i === 24 && (
              <div className="absolute inset-2 border-2 border-red-500/50 rounded-sm" />
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center font-mono">
        448×448×3
      </div>
    </button>
  );

  const componentDetails = {
    input: {
      title: "Input Processing",
      content: [
        "Accepts RGB images resized to 448×448 pixels",
        "Normalizes pixel values to [0, 1]",
        "Divides image into 7×7 grid for prediction",
        "Each grid cell responsible for object detection",
        "Multiple scale processing through the network"
      ]
    },
    backbone: {
      title: "Backbone Network",
      content: [
        "Modified GoogLeNet architecture",
        "24 convolutional layers for feature extraction",
        "Followed by 2 fully connected layers",
        "Pretrained on ImageNet classification",
        "Optimized for real-time performance"
      ]
    },
    detection: {
      title: "Detection Head",
      content: [
        "Predicts bounding boxes and class probabilities",
        "Each grid cell predicts B=2 bounding boxes",
        "Box prediction includes (x, y, w, h, confidence)",
        "Confidence reflects Pr(Object) × IOU",
        "20 conditional class probabilities per grid cell"
      ]
    },
    conv1: {
      title: "Convolution Layer 1",
      content: [
        "7×7 convolution with stride 2",
        "Reduces spatial dimensions by half",
        "Captures low-level features (edges, corners)",
        "64 output channels for diverse feature detection",
        "Followed by batch normalization and leaky ReLU"
      ]
    },
    conv2: {
      title: "Convolution Block 2",
      content: [
        "3×3 max pooling reduces spatial dimensions",
        "Multiple 3×3 convolutions",
        "Increased channel depth to 192",
        "Local response normalization",
        "Intermediate feature representation"
      ]
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Title and Description */}
        <div className="mb-12">
          <div className="font-mono text-sm text-gray-500 mb-1">Figure 1.</div>
          <h2 className="text-xl font-bold mb-2">YOLO Detection System</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Click on any component to see detailed information about its functionality and parameters.
          </p>
        </div>

        {/* Main Pipeline */}
        <div className="space-y-8">
          {/* Input Image */}
          <div className="flex justify-center">
            <GridVisualization details={componentDetails.input} />
          </div>

          <Arrow />

          {/* Backbone Phase */}
          <PhaseIndicator 
            title="BACKBONE (Modified GoogLeNet)" 
            details={componentDetails.backbone}
          />
          
          <div className="space-y-6">
            {[
              { size: 224, channels: 64, label: "Conv1 (7×7/2)", details: componentDetails.conv1 },
              { size: 112, channels: 192, label: "MaxPool + Conv2", type: "pool", details: componentDetails.conv2 },
              { size: 56, channels: 256, label: "Conv3 Block", showFeatures: true },
              { size: 28, channels: 512, label: "MaxPool + Conv4", type: "pool" },
              { size: 14, channels: 1024, label: "Conv5 Block", showFeatures: true }
            ].map((block, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <Block {...block} />
                {idx < 4 && <Arrow />}
              </div>
            ))}
          </div>

          <Arrow />

          {/* Detection Head Phase */}
          <PhaseIndicator 
            title="DETECTION HEAD" 
            details={componentDetails.detection}
          />

          <div className="space-y-8">
            <div className="flex justify-center">
              <Block size={7} channels={1024} label="Conv6" type="conv" />
            </div>

            <Arrow />

            <div className="flex justify-center">
              <button 
                onClick={() => setSelectedComponent(componentDetails.detection)}
                className="relative w-48 h-48 hover:shadow-lg transition-all duration-200"
              >
                <div className="absolute inset-0 grid grid-cols-7 grid-rows-7">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div key={i} className="relative border border-gray-300 dark:border-gray-600">
                      {i === 24 && (
                        <>
                          <div className="absolute inset-1 border border-green-500/50" />
                          <div className="absolute inset-2 border border-blue-500/50" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-6 left-0 right-0 text-center">
                  <div className="font-mono text-xs">7×7×30</div>
                  <div className="text-[10px] text-gray-500">(S×S×(B×5 + C))</div>
                </div>
              </button>
            </div>

            {/* Grid Cell Details */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { title: "Bounding Boxes", desc: ["x, y, w, h, conf", "B = 2 boxes"] },
                { title: "Confidence", desc: ["Pr(Object)", "× IOU"] },
                { title: "Classes", desc: ["20 classes", "per cell"] }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedComponent(componentDetails.detection)}
                  className="text-center border border-gray-200 dark:border-gray-700 rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="font-mono text-xs mb-2">{item.title}</div>
                  {item.desc.map((line, i) => (
                    <div key={i} className="text-xs text-gray-500">{line}</div>
                  ))}
                </button>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-mono text-xs text-gray-500">Speed</div>
                <div className="font-bold">45 FPS</div>
              </div>
              <div>
                <div className="font-mono text-xs text-gray-500">mAP</div>
                <div className="font-bold">63.4%</div>
              </div>
              <div>
                <div className="font-mono text-xs text-gray-500">Resolution</div>
                <div className="font-bold">448×448</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedComponent && (
        <DetailPanel 
          details={selectedComponent} 
          onClose={() => setSelectedComponent(null)} 
        />
      )}
    </div>
  );
};

export default YOLOViz;