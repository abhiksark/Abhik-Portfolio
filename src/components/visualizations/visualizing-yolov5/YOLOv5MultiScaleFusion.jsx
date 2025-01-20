import React, { useState } from 'react';
import { Box, ArrowRight } from 'lucide-react';

const YOLOv5MultiScaleFusion = () => {
  const [transformStep, setTransformStep] = useState(0);
  const [activeBox, setActiveBox] = useState(null);
  const [imageSize] = useState({ width: 640, height: 640 });

  const VISUALIZATION_SIZE = 100;

  const scales = {
    P5: {
      gridSize: 8,
      color: 'rgb(59, 130, 246)',
      lightColor: 'rgba(59, 130, 246, 0.1)',
      stride: 32,
      baseScale: 0.75
    },
    P4: {
      gridSize: 16,
      color: 'rgb(236, 72, 153)',
      lightColor: 'rgba(236, 72, 153, 0.1)',
      stride: 16,
      baseScale: 0.55
    }
  };

  const baseAnchors = {
    P5: [
      { width: 1.2, height: 1.2 },  // Square
      { width: 1.0, height: 2.0 },  // Tall
      { width: 2.0, height: 1.0 }   // Wide
    ],
    P4: [
      { width: 1.0, height: 1.0 },  // Square
      { width: 0.8, height: 1.6 },  // Tall
      { width: 1.6, height: 0.8 }   // Wide
    ]
  };

  const predictions = {
    P5: [
      {
        cell: { x: 3, y: 3 },
        dx: 0.5,
        dy: -0.5,
        dw: 0.4055,
        dh: 0.4055,
        confidence: 0.92,
        anchorIdx: 0,
        scale: 'P5'
      }
    ],
    P4: [
      {
        cell: { x: 6, y: 6 },
        dx: -0.5,
        dy: -0.5,
        dw: 0.3365,
        dh: 0.3365,
        confidence: 0.88,
        anchorIdx: 0,
        scale: 'P4'
      },
      {
        cell: { x: 7, y: 6 },
        dx: 0.5,
        dy: -0.5,
        dw: 0.3365,
        dh: 0.3365,
        confidence: 0.85,
        anchorIdx: 0,
        scale: 'P4'
      }
    ]
  };

  const sigmoid = (x) => 1 / (1 + Math.exp(-x));

  const getBaseScale = (scale) => {
    const stride = scales[scale].stride;
    return 4 * stride / Math.max(imageSize.width, imageSize.height);
  };

  const getTransformedBox = (prediction, step, showAllAnchors = false) => {
    const { gridSize, baseScale } = scales[prediction.scale];
    const anchor = baseAnchors[prediction.scale][prediction.anchorIdx];
    const cellSize = VISUALIZATION_SIZE / gridSize;

    let x = (prediction.cell.x + 0.5) * cellSize;
    let y = (prediction.cell.y + 0.5) * cellSize;
    let w = cellSize * baseScale * anchor.width;
    let h = cellSize * baseScale * anchor.height;

    if (step >= 1 && !showAllAnchors) {
      const offsetX = sigmoid(prediction.dx) - 0.5;
      const offsetY = sigmoid(prediction.dy) - 0.5;
      x += offsetX * cellSize;
      y += offsetY * cellSize;
    }

    if (step >= 2 && !showAllAnchors) {
      w *= Math.exp(prediction.dw);
      h *= Math.exp(prediction.dh);
    }

    const boundedX = Math.max(w/2, Math.min(VISUALIZATION_SIZE - w/2, x));
    const boundedY = Math.max(h/2, Math.min(VISUALIZATION_SIZE - h/2, y));

    return {
      x: boundedX - w/2,
      y: boundedY - h/2,
      width: w,
      height: h
    };
  };

  const calculateIoU = (box1, box2) => {
    const xLeft = Math.max(box1.x, box2.x);
    const yTop = Math.max(box1.y, box2.y);
    const xRight = Math.min(box1.x + box1.width, box2.x + box2.width);
    const yBottom = Math.min(box1.y + box1.height, box2.y + box2.height);

    if (xRight < xLeft || yBottom < yTop) return 0;

    const intersection = (xRight - xLeft) * (yBottom - yTop);
    const area1 = box1.width * box1.height;
    const area2 = box2.width * box2.height;

    return intersection / (area1 + area2 - intersection);
  };

  const getFusedBox = () => {
    const allBoxes = [...predictions.P5, ...predictions.P4]
      .map(pred => ({
        ...getTransformedBox(pred, 2),
        confidence: pred.confidence,
        scale: pred.scale
      }))
      .sort((a, b) => b.confidence - a.confidence);

    const nmsThreshold = 0.5;
    const selectedBoxes = [];

    for (const box of allBoxes) {
      let shouldSelect = true;
      for (const selectedBox of selectedBoxes) {
        const iou = calculateIoU(box, selectedBox);
        if (iou > nmsThreshold) {
          const weight = box.confidence / (box.confidence + selectedBox.confidence);
          selectedBox.x = selectedBox.x * (1 - weight) + box.x * weight;
          selectedBox.y = selectedBox.y * (1 - weight) + box.y * weight;
          selectedBox.width = selectedBox.width * (1 - weight) + box.width * weight;
          selectedBox.height = selectedBox.height * (1 - weight) + box.height * weight;
          selectedBox.confidence = Math.max(selectedBox.confidence, box.confidence);
          shouldSelect = false;
          break;
        }
      }
      if (shouldSelect) selectedBoxes.push(box);
    }

    if (selectedBoxes.length > 0) {
      const totalConfidence = selectedBoxes.reduce((sum, box) => sum + box.confidence, 0);
      const fusedBox = {
        x: selectedBoxes.reduce((sum, box) => sum + box.x * box.confidence, 0) / totalConfidence,
        y: selectedBoxes.reduce((sum, box) => sum + box.y * box.confidence, 0) / totalConfidence,
        width: selectedBoxes.reduce((sum, box) => sum + box.width * box.confidence, 0) / totalConfidence,
        height: selectedBoxes.reduce((sum, box) => sum + box.height * box.confidence, 0) / totalConfidence,
        confidence: selectedBoxes.reduce((max, box) => Math.max(max, box.confidence), 0)
      };

      fusedBox.x = Math.max(fusedBox.width/2, Math.min(100 - fusedBox.width/2, fusedBox.x));
      fusedBox.y = Math.max(fusedBox.height/2, Math.min(100 - fusedBox.height/2, fusedBox.y));

      return fusedBox;
    }
    return null;
  };

  const renderGrid = (scale) => {
    const { gridSize, color } = scales[scale];
    return Array.from({ length: gridSize * gridSize }).map((_, idx) => {
      const i = Math.floor(idx / gridSize);
      const j = idx % gridSize;
      const isContributing = predictions[scale].some(
        pred => pred.cell.x === j && pred.cell.y === i
      );

      return (
        <div
          key={`${scale}-grid-${idx}`}
          className={`border ${isContributing ? 'border-2' : 'border'}`}
          style={{
            width: `${100/gridSize}%`,
            height: `${100/gridSize}%`,
            position: 'absolute',
            left: `${(j * 100)/gridSize}%`,
            top: `${(i * 100)/gridSize}%`,
            borderColor: isContributing ? color : 'rgb(209, 213, 219)',
            background: isContributing ? scales[scale].lightColor : 'transparent'
          }}
        />
      );
    });
  };

  const renderPredictions = () => {
    if (transformStep === 3) {
      const fusedBox = getFusedBox();
      if (!fusedBox) return null;

      return (
        <div
          className="absolute transition-all duration-500"
          style={{
            width: `${fusedBox.width}%`,
            height: `${fusedBox.height}%`,
            left: `${fusedBox.x}%`,
            top: `${fusedBox.y}%`,
            border: '3px solid rgb(34, 197, 94)',
            background: 'rgba(34, 197, 94, 0.1)'
          }}
        >
          <div className="absolute -right-40 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs rounded bg-green-600 text-white whitespace-nowrap">
            Final Detection (conf: {fusedBox.confidence.toFixed(2)})
          </div>
        </div>
      );
    }

    const showAllAnchors = transformStep === 0;

    if (showAllAnchors) {
      return (
        <>
          {Object.entries(baseAnchors).map(([scale, anchors]) =>
            anchors.map((_, anchorIdx) => {
              const basePred = {
                cell: { x: scale === 'P5' ? 3 : 6, y: scale === 'P5' ? 3 : 6 },
                dx: 0,
                dy: 0,
                dw: 0,
                dh: 0,
                confidence: scale === 'P5' ? 0.92 : 0.88,
                anchorIdx,
                scale
              };
              const box = getTransformedBox(basePred, 0, true);
              const boxKey = `${scale}-base-${anchorIdx}`;
              
              return (
                <div
                  key={boxKey}
                  className="absolute transition-all duration-500 cursor-pointer"
                  onClick={() => setActiveBox(boxKey)}
                  style={{
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    border: activeBox === boxKey
                      ? '2px solid rgb(34, 197, 94)'
                      : `2px solid ${scales[scale].color}`,
                    background: activeBox === boxKey
                      ? 'rgba(34, 197, 94, 0.1)'
                      : scales[scale].lightColor,
                    zIndex: activeBox === boxKey ? 10 : 1
                  }}
                >
                  <div
                    className="absolute -top-6 left-0 px-2 py-1 text-xs rounded text-white whitespace-nowrap"
                    style={{
                      backgroundColor: activeBox === boxKey
                        ? 'rgb(34, 197, 94)'
                        : scales[scale].color
                    }}
                  >
                    {scale} Anchor {anchorIdx + 1}
                  </div>
                </div>
              );
            })
          )}
        </>
      );
    }

    return Object.entries(predictions).map(([scale, preds]) =>
      preds.map((pred, idx) => {
        if (transformStep < 3) {
          const box = getTransformedBox(pred, transformStep);
          const boxKey = `${scale}-${idx}`;
          return (
            <div
              key={boxKey}
              className="absolute transition-all duration-500 cursor-pointer"
              onClick={() => setActiveBox(boxKey)}
              style={{
                width: `${box.width}%`,
                height: `${box.height}%`,
                left: `${box.x}%`,
                top: `${box.y}%`,
                border: activeBox === boxKey
                  ? '2px solid rgb(34, 197, 94)'
                  : `2px solid ${scales[scale].color}`,
                background: activeBox === boxKey
                  ? 'rgba(34, 197, 94, 0.1)'
                  : scales[scale].lightColor,
                zIndex: activeBox === boxKey ? 10 : 1
              }}
            >
              <div
                className="absolute -top-6 left-0 px-2 py-1 text-xs rounded text-white whitespace-nowrap"
                style={{
                  backgroundColor: activeBox === boxKey
                    ? 'rgb(34, 197, 94)'
                    : scales[scale].color
                }}
              >
                {scale} (conf: {pred.confidence.toFixed(2)})
              </div>
            </div>
          );
        }
        return null;
      })
    );
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-xl font-bold dark:text-gray-200">
          <Box className="w-6 h-6" />
          YOLOv5 Multi-scale Prediction Fusion (P4 + P5)
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            {[
              'Base Anchors',
              'Position Adjust',
              'Size Adjust',
              'Cross-scale Fusion'
            ].map((step, idx) => (
              <React.Fragment key={step}>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    transformStep === idx 
                      ? 'bg-green-500 dark:bg-green-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                  onClick={() => setTransformStep(idx)}
                >
                  {step}
                </button>
                {idx < 3 && <ArrowRight className="w-4 h-4 dark:text-gray-400" />}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="absolute inset-0" style={{ opacity: transformStep < 3 ? 1 : 0.2 }}>
                {renderGrid('P5')}
              </div>
              <div className="absolute inset-0" style={{ opacity: transformStep < 3 ? 1 : 0.2 }}>
                {renderGrid('P4')}
              </div>
              {renderPredictions()}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">Multi-scale Fusion Process</h3>
              <div className="space-y-4">
                {transformStep === 0 && (
                  <div className="space-y-3">
                    <div className="p-3 bg-white dark:bg-gray-900 rounded shadow border-l-4" style={{ borderColor: scales.P5.color }}>
                      <p className="font-medium dark:text-gray-200">P5 Scale (8×8 grid)</p>
                      <p className="mb-2 dark:text-gray-300">Base Anchors:</p>
                      <div className="ml-2 space-y-2">
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="font-medium dark:text-gray-200">Square Anchor:</p>
                          <p className="dark:text-gray-300">Width: 1.2, Height: 1.2</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">For roughly square objects</p>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="font-medium dark:text-gray-200">Tall Anchor:</p>
                          <p className="dark:text-gray-300">Width: 1.0, Height: 2.0</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">For tall/vertical objects</p>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="font-medium dark:text-gray-200">Wide Anchor:</p>
                          <p className="dark:text-gray-300">Width: 2.0, Height: 1.0</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">For wide/horizontal objects</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-900 rounded shadow border-l-4" style={{ borderColor: scales.P4.color }}>
                      <p className="font-medium dark:text-gray-200">P4 Scale (16×16 grid)</p>
                      <p className="mb-2 dark:text-gray-300">Base Anchors:</p>
                      <div className="ml-2 space-y-2">
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="font-medium dark:text-gray-200">Square Anchor:</p>
                          <p className="dark:text-gray-300">Width: 1.0, Height: 1.0</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">For square objects</p>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="font-medium dark:text-gray-200">Tall Anchor:</p>
                          <p className="dark:text-gray-300">Width: 0.8, Height: 1.6</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">For tall/vertical objects</p>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <p className="font-medium dark:text-gray-200">Wide Anchor:</p>
                          <p className="dark:text-gray-300">Width: 1.6, Height: 0.8</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">For wide/horizontal objects</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {transformStep === 1 && (
                  <div className="p-3 bg-white dark:bg-gray-900 rounded shadow border-l-4 border-purple-500">
                    <p className="font-medium dark:text-gray-200">Position Refinement</p>
                    <p className="dark:text-gray-300">Each prediction adjusts its center position relative to its grid cell</p>
                    <p className="mt-2 dark:text-gray-300">Offset range: [-0.5, 0.5] after sigmoid</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      P5: Coarse adjustments (32px stride)<br/>
                      P4: Finer adjustments (16px stride)
                    </p>
                  </div>
                )}

                {transformStep === 2 && (
                  <div className="p-3 bg-white dark:bg-gray-900 rounded shadow border-l-4 border-green-500">
                    <p className="font-medium dark:text-gray-200">Size Adjustment</p>
                    <p className="dark:text-gray-300">Each prediction refines its anchor box dimensions:</p>
                    <div className="mt-2 space-y-2">
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <p className="font-medium dark:text-gray-200">P5 Adjustments:</p>
                        <p className="dark:text-gray-300">Scale factor: exp(0.4055) ≈ 1.5×</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">50% size increase</p>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <p className="font-medium dark:text-gray-200">P4 Adjustments:</p>
                        <p className="dark:text-gray-300">Scale factor: exp(0.3365) ≈ 1.4×</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">40% size increase</p>
                      </div>
                    </div>
                  </div>
                )}

                {transformStep === 3 && (
                  <div className="p-3 bg-white dark:bg-gray-900 rounded shadow border-l-4 border-green-500">
                    <p className="font-medium dark:text-gray-200">Cross-scale Fusion with NMS</p>
                    <p className="dark:text-gray-300">1. Sort predictions by confidence</p>
                    <p className="dark:text-gray-300">2. Apply NMS with IoU threshold 0.5</p>
                    <p className="dark:text-gray-300">3. Weighted box merging</p>
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Final box combines precise positioning from P4
                        with robust size estimation from P5
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YOLOv5MultiScaleFusion;