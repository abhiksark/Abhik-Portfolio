import React from 'react';

function CUDAFusionBulletPoints() {
  const inputMatrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-3 md:p-4 rounded-lg space-y-2 border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-200">
          Mathematical Properties:
        </h3>
        <ul className="text-xs md:text-sm space-y-1 text-gray-700 dark:text-gray-300">
          <li>• Fusion preserves computational equivalence: f₃(f₂(f₁(x))) ≡ f<sub>fused</sub>(x)</li>
          <li>• Memory bandwidth utilization: (R + W)<sub>fused</sub> &lt; Σ(R + W)<sub>individual</sub></li>
          <li>• Theoretical speedup: S = T<sub>separate</sub>/T<sub>fused</sub> ≈ (n<sub>ops</sub> + n<sub>sync</sub>)/(1 + 1)</li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-200">
          Performance Implications:
        </h3>
        <ul className="text-xs md:text-sm space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Reduced memory transactions: {inputMatrix.length * inputMatrix[0].length} → {Math.floor(inputMatrix.length * inputMatrix[0].length / 3)} global loads</li>
          <li>• Register reuse: Intermediate results stored in registers instead of global memory</li>
          <li>• Improved instruction cache utilization through unified kernel execution</li>
        </ul>
      </div>
    </div>
  );
}

export default CUDAFusionBulletPoints;