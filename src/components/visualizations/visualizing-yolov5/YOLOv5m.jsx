import React, { useState } from 'react';
import { Info, ChevronDown, ChevronRight, Layers, Box, Activity, Settings } from 'lucide-react';

const SizeBox = ({ title, data }) => (
  <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm">
    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h4>
    <div className="space-y-1 text-sm">
      {data.map(({ label, value }) => (
        <div key={label} className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{label}</span>
          <span className="font-medium font-mono dark:text-gray-300">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

const ArchitectureBlock = ({ title, type, dimensions, specs, children }) => {
  const [showSpecs, setShowSpecs] = useState(false);
  
  const bgColors = {
    input: "bg-gray-50 dark:bg-gray-800/50",
    backbone: "bg-blue-50 dark:bg-blue-900/20",
    neck: "bg-green-50 dark:bg-green-900/20",
    head: "bg-purple-50 dark:bg-purple-900/20",
    output: "bg-orange-50 dark:bg-orange-900/20"
  };

  return (
    <div className={`${bgColors[type]} rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</h3>
        {specs && (
          <div className="relative">
            <Settings
              className="w-5 h-5 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200"
              onMouseEnter={() => setShowSpecs(true)}
              onMouseLeave={() => setShowSpecs(false)}
            />
            {showSpecs && (
              <div className="absolute right-0 z-10 w-64 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm space-y-1">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                      <span className="font-medium font-mono dark:text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {dimensions && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-4 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-600 dark:text-blue-400">Input:</span>
              <div className="text-gray-700 dark:text-gray-300 mt-1 font-mono">{dimensions.input}</div>
            </div>
            <div>
              <span className="font-medium text-green-600 dark:text-green-400">Output:</span>
              <div className="text-gray-700 dark:text-gray-300 mt-1 font-mono whitespace-pre-line">{dimensions.output}</div>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

const YOLOv5m = () => {
  const sizeBoxData = {
    inputSpecs: [
      { label: 'Shape', value: '(B, 3, 640, 640)' },
      { label: 'Type', value: 'float32' },
      { label: 'Range', value: '[0, 1]' },
      { label: 'Memory', value: '3.75 MB' }
    ],
    preprocessing: [
      { label: 'Input', value: '(B, 3, H, W)' },
      { label: 'Resize', value: '(B, 3, 640, 640)' },
      { label: 'Normalize', value: '/255.0' },
      { label: 'Format', value: 'NCHW' }
    ],
    p3Features: [
      { label: 'Shape', value: '(B, 192, 80, 80)' },
      { label: 'Scale', value: '1/8' },
      { label: 'Elements', value: '1,228,800' },
      { label: 'RF', value: '52×52' }
    ],
    p4Features: [
      { label: 'Shape', value: '(B, 384, 40, 40)' },
      { label: 'Scale', value: '1/16' },
      { label: 'Elements', value: '614,400' },
      { label: 'RF', value: '104×104' }
    ],
    p5Features: [
      { label: 'Shape', value: '(B, 768, 20, 20)' },
      { label: 'Scale', value: '1/32' },
      { label: 'Elements', value: '307,200' },
      { label: 'RF', value: '208×208' }
    ],
    bottomUpPath: [
      { label: 'P5→P4', value: '(B, 384, 40, 40)' },
      { label: 'P4→P3', value: '(B, 192, 80, 80)' },
      { label: 'Operation', value: 'Upsample' },
      { label: 'Fusion', value: 'Concat' }
    ],
    topDownPath: [
      { label: 'P3→P4', value: '(B, 384, 40, 40)' },
      { label: 'P4→P5', value: '(B, 768, 20, 20)' },
      { label: 'Operation', value: 'Strided Conv' },
      { label: 'Fusion', value: 'Concat' }
    ],
    smallObjects: [
      { label: 'Input', value: '(B, 192, 80, 80)' },
      { label: 'Output', value: '(B, 85, 80, 80)' },
      { label: 'Anchors', value: '3' },
      { label: 'Predictions', value: '19,200' }
    ],
    mediumObjects: [
      { label: 'Input', value: '(B, 384, 40, 40)' },
      { label: 'Output', value: '(B, 85, 40, 40)' },
      { label: 'Anchors', value: '3' },
      { label: 'Predictions', value: '4,800' }
    ],
    largeObjects: [
      { label: 'Input', value: '(B, 768, 20, 20)' },
      { label: 'Output', value: '(B, 85, 20, 20)' },
      { label: 'Anchors', value: '3' },
      { label: 'Predictions', value: '1,200' }
    ],
    preNMS: [
      { label: 'Shape', value: '(B, 25200, 85)' },
      { label: 'Boxes', value: '25,200' },
      { label: 'Classes', value: '80' },
      { label: 'Conf', value: '1' }
    ],
    postNMS: [
      { label: 'Shape', value: '(B, 300, 85)' },
      { label: 'Boxes', value: '300' },
      { label: 'Format', value: 'XYWH' },
      { label: 'Conf', value: '>0.25' }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 dark:bg-gray-900">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">YOLOv5m Architecture</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Medium-scale Model with Enhanced Feature Capacity</p>
      </div>

      <div className="space-y-6">
        {/* Input Processing */}
        <ArchitectureBlock
          title="Input Processing"
          type="input"
          dimensions={{
            input: "(B, 3, H, W)",
            output: "(B, 3, 640, 640)"
          }}
          specs={{
            "Memory": "3.75 MB",
            "Format": "NCHW",
            "Range": "[0, 1]",
            "Type": "float32"
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <SizeBox title="Input Specifications" data={sizeBoxData.inputSpecs} />
            <SizeBox title="Preprocessing" data={sizeBoxData.preprocessing} />
          </div>
        </ArchitectureBlock>

        {/* Backbone */}
        <ArchitectureBlock
          title="Backbone (CSP-Darknet53)"
          type="backbone"
          dimensions={{
            input: "(B, 3, 640, 640)",
            output: "P3: (B, 192, 80, 80)\nP4: (B, 384, 40, 40)\nP5: (B, 768, 20, 20)"
          }}
          specs={{
            "Parameters": "8.4M",
            "FLOPs": "25.9G",
            "Width Mult": "0.75",
            "Memory": "62MB"
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            <SizeBox title="P3 Features" data={sizeBoxData.p3Features} />
            <SizeBox title="P4 Features" data={sizeBoxData.p4Features} />
            <SizeBox title="P5 Features" data={sizeBoxData.p5Features} />
          </div>
        </ArchitectureBlock>

        {/* Neck */}
        <ArchitectureBlock
          title="Neck (PANet)"
          type="neck"
          dimensions={{
            input: "P3: (B, 192, 80, 80)\nP4: (B, 384, 40, 40)\nP5: (B, 768, 20, 20)",
            output: "N3: (B, 192, 80, 80)\nN4: (B, 384, 40, 40)\nN5: (B, 768, 20, 20)"
          }}
          specs={{
            "Parameters": "4.2M",
            "FLOPs": "8.4G",
            "Memory": "45MB",
            "Fusion": "Skip+Concat"
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <SizeBox title="Bottom-up Path" data={sizeBoxData.bottomUpPath} />
            <SizeBox title="Top-down Path" data={sizeBoxData.topDownPath} />
          </div>
        </ArchitectureBlock>

        {/* Detection Heads */}
        <ArchitectureBlock
          title="Detection Heads"
          type="head"
          dimensions={{
            input: "N3: (B, 192, 80, 80)\nN4: (B, 384, 40, 40)\nN5: (B, 768, 20, 20)",
            output: "(B, 25200, 85)"
          }}
          specs={{
            "Parameters": "2.4M",
            "Predictions": "25,200",
            "Box Format": "xywh",
            "Classes": "80"
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            <SizeBox title="Small Objects" data={sizeBoxData.smallObjects} />
            <SizeBox title="Medium Objects" data={sizeBoxData.mediumObjects} />
            <SizeBox title="Large Objects" data={sizeBoxData.largeObjects} />
          </div>
        </ArchitectureBlock>

        {/* Output */}
        <ArchitectureBlock
          title="Output Processing"
          type="output"
          dimensions={{
            input: "(B, 25200, 85)",
            output: "(B, 300, 85)"
          }}
          specs={{
            "NMS": "IoU 0.45",
            "Conf": "0.25",
            "Max Det": "300",
            "Memory": "4MB"
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <SizeBox title="Pre-NMS" data={sizeBoxData.preNMS} />
            <SizeBox title="Post-NMS" data={sizeBoxData.postNMS} />
          </div>
        </ArchitectureBlock>
      </div>

      {/* Model Summary */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Model Summary</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Performance</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• mAP@0.5: 0.451 (COCO)</li>
              <li>• Inference: ~8.2ms (V100)</li>
              <li>• FPS: ~122 (batch=1)</li>
              <li>• Size: 42.5MB</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Architecture</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Parameters: 21.2M</li>
              <li>• GFLOPs: 49.0</li>
              <li>• Memory: ~240MB</li>
              <li>• Layers: 294</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Features</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• CSP Bottlenecks</li>
              <li>• PANet Feature Fusion</li>
              <li>• Multi-scale Detection</li>
              <li>• Auto-learning Anchors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YOLOv5m;