import React, { useState, useEffect } from 'react';

const DCTAdditionVisualization = () => {
  const GRID_SIZE = 8;
  const [numComponents, setNumComponents] = useState(1);
  const [dctCoefficients, setDctCoefficients] = useState([]);
  const [weightedComponents, setWeightedComponents] = useState([]);
  const [summedImage, setSummedImage] = useState(null);
  const [coefficientValues, setCoefficientValues] = useState([]);

  // Original code for DCT calculations remains the same...
  const originalZero = [
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ].map(row => row.map(v => v * 255));

  const applyDCT = (block) => {
    const dctBlock = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    
    for (let u = 0; u < GRID_SIZE; u++) {
      for (let v = 0; v < GRID_SIZE; v++) {
        let sum = 0;
        for (let x = 0; x < GRID_SIZE; x++) {
          for (let y = 0; y < GRID_SIZE; y++) {
            sum += block[x][y] * 
                   Math.cos((2 * x + 1) * u * Math.PI / (2 * GRID_SIZE)) * 
                   Math.cos((2 * y + 1) * v * Math.PI / (2 * GRID_SIZE));
          }
        }
        const cu = u === 0 ? 1/Math.sqrt(2) : 1;
        const cv = v === 0 ? 1/Math.sqrt(2) : 1;
        dctBlock[u][v] = 0.25 * cu * cv * sum;
      }
    }
    return dctBlock;
  };

  const generateBasis = (u, v) => {
    const pattern = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const cu = u === 0 ? 1/Math.sqrt(2) : 1;
        const cv = v === 0 ? 1/Math.sqrt(2) : 1;
        pattern[x][y] = cu * cv * 
          Math.cos((2 * x + 1) * u * Math.PI / (2 * GRID_SIZE)) * 
          Math.cos((2 * y + 1) * v * Math.PI / (2 * GRID_SIZE));
      }
    }
    return pattern;
  };

  const normalizeBlock = (block) => {
    if (!block || !block.length) return Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    let min = Infinity;
    let max = -Infinity;
    
    block.forEach(row => {
      row.forEach(val => {
        min = Math.min(min, val);
        max = Math.max(max, val);
      });
    });
    
    const range = max - min;
    if (range === 0) return block.map(row => row.map(() => 128));
    
    return block.map(row =>
      row.map(val => Math.floor(((val - min) / range) * 255))
    );
  };

  const calculateSum = (numComponentsToUse) => {
    const sum = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    
    for (let i = 0; i < numComponentsToUse; i++) {
      const u = Math.floor(i / GRID_SIZE);
      const v = i % GRID_SIZE;
      const basis = generateBasis(u, v);
      const weight = dctCoefficients[u][v];
      
      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          sum[x][y] += basis[x][y] * weight;
        }
      }
    }
    
    return normalizeBlock(sum);
  };

  useEffect(() => {
    const dct = applyDCT(originalZero);
    setDctCoefficients(dct);

    const components = [];
    const coefficients = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const u = Math.floor(i / GRID_SIZE);
      const v = i % GRID_SIZE;
      const basis = generateBasis(u, v);
      const weight = dct[u][v];
      coefficients.push(weight);
      const weighted = basis.map(row => 
        row.map(val => val * weight)
      );
      components.push(normalizeBlock(weighted));
    }
    setWeightedComponents(components);
    setCoefficientValues(coefficients);
  }, []);

  useEffect(() => {
    if (dctCoefficients.length > 0) {
      setSummedImage(calculateSum(numComponents));
    }
  }, [numComponents, dctCoefficients]);

  const BlockDisplay = ({ block, title, coefficient = null }) => {
    if (!block || !block.length) return null;
    
    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium dark:text-gray-200">{title}</h3>
          {coefficient !== null && (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded dark:text-gray-200">
              {coefficient.toFixed(1)}
            </span>
          )}
        </div>
        <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700 p-1">
          {block.flat().map((value, i) => (
            <div
              key={i}
              className="aspect-square"
              style={{
                backgroundColor: `rgb(${value}, ${value}, ${value})`,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6 dark:bg-gray-900 min-h-screen">
      <div className="space-y-2">
        <h2 className="text-xl font-bold dark:text-white">DCT Component Addition</h2>
        <p className="text-gray-600 dark:text-gray-400">
          See how DCT components and their coefficients add up to form the image
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium flex items-center flex-wrap gap-2 dark:text-gray-200">
            Components:
            <input
              type="range"
              min="1"
              max="64"
              value={numComponents}
              onChange={(e) => setNumComponents(Number(e.target.value))}
              className="w-32 dark:bg-gray-700"
            />
            <span>{numComponents}/64</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlockDisplay 
            block={originalZero}
            title="Original Image"
          />
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium dark:text-gray-200">Active Components</h3>
            <div className="grid grid-cols-8 gap-1">
              {Array(64).fill().map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square ${
                    i < numComponents 
                      ? 'bg-blue-500 dark:bg-blue-600' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {i < numComponents && (
                    <div className="h-full flex items-center justify-center text-white text-xs">
                      {Math.abs(coefficientValues[i]).toFixed(0)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <BlockDisplay 
            block={summedImage}
            title={`Reconstructed (${numComponents} components)`}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Components in Use:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1">
            {weightedComponents.slice(0, numComponents).map((component, i) => (
              <BlockDisplay 
                key={i}
                block={component}
                title={`(${Math.floor(i/GRID_SIZE)},${i%GRID_SIZE})`}
                coefficient={coefficientValues[i]}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Understanding the Values:</h3>
          <ul className="list-disc pl-5 space-y-1 dark:text-gray-300">
            <li>Each component has a coefficient (shown above each pattern)</li>
            <li>Larger coefficients mean stronger contribution to final image</li>
            <li>The DC component (0,0) usually has the largest coefficient</li>
            <li>Notice how coefficient values tend to decrease for higher frequencies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DCTAdditionVisualization;