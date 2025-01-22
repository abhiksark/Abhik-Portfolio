import React, { useState, useMemo, useCallback } from 'react';
import { Info, ArrowRight, ChevronDown, ChevronUp, Layers } from 'lucide-react';

const VIT_CONFIG = {
  image: {
    size: 224,
    patchSize: 16,
    get numPatches() { return Math.floor(this.size / this.patchSize); },
    get totalPatches() { return this.numPatches * this.numPatches; }
  },
  model: {
    embeddingDim: 768,
    numLayers: 12,
    numHeads: 12,
    mlpDim: 3072,
    numClasses: 80,
    maxObjects: 100
  }
};

const ViTVisualization = () => {
  const [selectedPatch, setSelectedPatch] = useState(null);
  const [expandedLayers, setExpandedLayers] = useState(new Set([0]));

  const toggleLayer = useCallback((layerIndex) => {
    setExpandedLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerIndex)) {
        next.delete(layerIndex);
      } else {
        next.add(layerIndex);
      }
      return next;
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Section
        title="Vision Transformer Architecture"
        tooltip={{
          title: "Overview",
          content: "Interactive visualization of a Vision Transformer (ViT) model for object detection"
        }}
      >
        <ArchitectureDetails />
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section
          title="Image Patches"
          tooltip={{
            title: "Patch Embedding",
            content: `Input image is divided into <span class="math-inline">\{VIT\_CONFIG\.image\.patchSize\}×</span>{VIT_CONFIG.image.patchSize} patches`
          }}
        >
          <PatchVisualization
            selectedPatch={selectedPatch}
            onPatchSelect={setSelectedPatch}
          />
        </Section>

        <Section
          title="Token Embeddings"
          tooltip={{
            title: "Embedding Tokens",
            content: "Each patch is embedded into a high-dimensional vector space"
          }}
        >
          <EmbeddingVisualization selectedPatch={selectedPatch} />
        </Section>
      </div>

      <Section
        title="Transformer Layers"
        tooltip={{
          title: "Layer Stack",
          content: `Stack of ${VIT_CONFIG.model.numLayers} transformer layers processing spatial information`
        }}
        className="space-y-4"
      >
        {Array(Math.min(3, VIT_CONFIG.model.numLayers)).fill(0).map((_, idx) => (
          <TransformerLayer
            key={idx}
            layerIndex={idx}
            isExpanded={expandedLayers.has(idx)}
            onToggle={() => toggleLayer(idx)}
          />
        ))}
        {VIT_CONFIG.model.numLayers > 3 && (
          <div className="text-center text-gray-400 py-4">⋮</div>
        )}
        {VIT_CONFIG.model.numLayers > 3 && (
          <TransformerLayer
            layerIndex={VIT_CONFIG.model.numLayers - 1}
            isExpanded={expandedLayers.has(VIT_CONFIG.model.numLayers - 1)}
            onToggle={() => toggleLayer(VIT_CONFIG.model.numLayers - 1)}
          />
        )}
      </Section>

      <Section
        title="Detection Heads"
        tooltip={{
          title: "Object Detection",
          content: "Predicts object classes and bounding boxes from transformer features"
        }}
      >
        <DetectionHead />
      </Section>
    </div>
  );
};

export default ViTVisualization;

const Section = ({ title, tooltip, children, className = '' }) => (
  <section className={`space-y-4 ${className}`}>
    <h2 className="text-xl font-semibold flex items-center">
      {title}
      {tooltip && (
        <InfoTooltip
          title={tooltip.title}
          content={tooltip.content}
        />
      )}
    </h2>
    {children}
  </section>
);

const InfoTooltip = ({ title, content }) => {
  const [show, setShow] = useState(false);

  const handleMouseEvents = {
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  };

  return (
    <div className="relative inline-block ml-2">
      <button
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Information about ${title}`}
        {...handleMouseEvents}
      >
        <Info className="w-4 h-4 text-blue-500" />
      </button>
      {show && (
        <div className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-64 transform -translate-x-1/2 left-1/2 -top-2 mt-2">
          <div className="font-semibold mb-1">{title}</div>
          <div className="text-sm text-gray-600">{content}</div>
        </div>
      )}
    </div>
  );
};

const PatchVisualization = ({ selectedPatch, onPatchSelect }) => {
  const patches = useMemo(() => {
    const result = [];
    for (let i = 0; i < VIT_CONFIG.image.numPatches; i++) {
      for (let j = 0; j < VIT_CONFIG.image.numPatches; j++) {
        result.push({
          id: i * VIT_CONFIG.image.numPatches + j,
          style: {
            top: `${(i * 100) / VIT_CONFIG.image.numPatches}%`,
            left: `${(j * 100) / VIT_CONFIG.image.numPatches}%`,
            width: `${100 / VIT_CONFIG.image.numPatches}%`,
            height: `${100 / VIT_CONFIG.image.numPatches}%`,
          }
        });
      }
    }
    return result;
  }, []);

  return (
    <div className="relative aspect-square bg-white rounded-lg overflow-hidden border-2 border-blue-500">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
        {patches.map(({ id, style }) => (
          <button
            key={id}
            className={`absolute border border-blue-300 transition-colors
              ${selectedPatch === id ? 'bg-blue-200' : 'hover:bg-blue-100'}
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            style={style}
            onMouseEnter={() => onPatchSelect(id)}
            onMouseLeave={() => onPatchSelect(null)}
            aria-label={`Patch ${id + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const EmbeddingVisualization = ({ selectedPatch }) => {
  const embeddings = useMemo(() => (
    Array(VIT_CONFIG.image.totalPatches).fill(0).map((_, idx) => ({
      id: idx,
      isSelected: selectedPatch === idx
    }))
  ), [selectedPatch]);

  const EmbeddingRow = ({ type, id, isSelected }) => {
    const baseClasses = "h-8 rounded flex items-center px-2 text-xs border";
    const styleMap = {
      cls: "bg-purple-100 border-purple-300",
      spatial: "bg-orange-100 border-orange-300",
      patch: isSelected ? "bg-green-200 border-green-400" : "bg-green-100 border-green-300"
    };

    return (
      <div className={`${baseClasses} ${styleMap[type]}`}>
        <div className="flex justify-between w-full">
          <span>{type === 'cls' ? '[CLS] Token' : type === 'spatial' ? '[SPATIAL]' : `Patch ${id + 1}`}</span>
          <span className="font-mono">{VIT_CONFIG.model.embeddingDim}d</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2" role="list">
      <EmbeddingRow type="cls" id={0} isSelected={false} />
      <EmbeddingRow type="spatial" id={0} isSelected={false} />
      {embeddings.slice(0, 5).map(({ id, isSelected }) => (
        <EmbeddingRow key={id} type="patch" id={id} isSelected={isSelected} />
      ))}
      <div className="text-center text-gray-400">⋮</div>
      {embeddings.slice(-1).map(({ id, isSelected }) => (
        <EmbeddingRow key={id} type="patch" id={id} isSelected={isSelected} />
      ))}
    </div>
  );
};

const TransformerLayer = ({ layerIndex, isExpanded, onToggle }) => {
  const headDimension = VIT_CONFIG.model.embeddingDim / VIT_CONFIG.model.numHeads;

  const MultiHeadAttentionDetail = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-purple-50 p-3 rounded-lg">
        <div className="space-y-2 text-center">
          <div className="font-medium text-sm">Input</div>
          <div className="bg-white rounded p-2 text-sm">
            <div className="font-mono">{VIT_CONFIG.model.embeddingDim}d</div>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-purple-500" />
        <div className="space-y-2">
          <div className="text-center font-medium text-sm">Q/K/V Projections</div>
          <div className="grid grid-cols-3 gap-2">
            {['Q', 'K', 'V'].map(type => (
              <div key={type} className="bg-white rounded p-2 text-center">
                <div className="text-xs font-semibold text-purple-700">{type}</div>
                <div className="text-xs font-mono">{headDimension}d</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-medium text-sm flex items-center">
          Parallel Attention Heads
          <InfoTooltip
            title="Spatial Attention"
            content="Each head computes attention over spatial locations to capture object relationships"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Array(Math.min(4, VIT_CONFIG.model.numHeads)).fill(0).map((_, idx) => (
            <div key={idx} className="bg-white rounded p-2 border border-purple-200">
              <div className="text-center">
                <div className="font-medium text-sm text-purple-700">Head {idx + 1}</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Input: {headDimension}d</div>
                  <div>Attention: {VIT_CONFIG.image.totalPatches + 2}×{VIT_CONFIG.image.totalPatches + 2}</div>
                  <div>Output: {headDimension}d</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-lg border-2 border-gray-200 transition-all duration-300">
      <button
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Layer {layerIndex + 1}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          <div className="bg-purple-100 rounded-lg p-4">
            <h4 className="font-medium mb-4 flex items-center">
              Multi-Head Self-Attention
              <InfoTooltip
                title="Multi-Head Attention"
                content={`Processes input through ${VIT_CONFIG.model.numHeads} parallel attention heads with spatial awareness`}
              />
            </h4>
            <MultiHeadAttentionDetail />
          </div>

          <div className="bg-blue-100 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center">
              MLP Block
              <InfoTooltip
                title="MLP Block"
                content="Feed-forward network processing each token independently"
              />
            </h4>
            <div className="flex justify-between items-center">
              <div className="bg-white rounded p-2 w-24 text-center">
                <div className="font-mono text-sm">{VIT_CONFIG.model.embeddingDim}</div>
                <div className="text-xs text-gray-600">Input</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-500" />
              <div className="bg-white rounded p-2 w-24 text-center">
                <div className="font-mono text-sm">{VIT_CONFIG.model.mlpDim}</div>
                <div className="text-xs text-gray-600">Hidden</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-500" />
              <div className="bg-white rounded p-2 w-24 text-center">
                <div className="font-mono text-sm">{VIT_CONFIG.model.embeddingDim}</div>
                <div className="text-xs text-gray-600">Output</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetectionHead = () => (
  <div className="space-y-4">
    <div className="bg-indigo-100 rounded-lg p-4">
      <h4 className="font-medium mb-2 flex items-center">
        Spatial Features
        <InfoTooltip
          title="Feature Map"
          content="Transformer outputs preserving spatial information for detection"
        />
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded p-2 text-center">
            <div className="text-xs font-mono">{VIT_CONFIG.model.embeddingDim}d</div>
            <div className="text-xs text-gray-600">Position {i+1}</div>
          </div>
        ))}
        <div className="col-span-3 text-center">⋮</div>
      </div>
    </div>

    <div className="bg-indigo-50 rounded-lg p-4">
      <h4 className="font-medium mb-2 flex items-center">
        Detection MLP Head
        <InfoTooltip
          title="Detection Head"
          content="Predicts object classes and bounding boxes from spatial features"
        />
      </h4>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="bg-white rounded p-2 flex-1 mr-2">
            <div className="text-sm text-center">Classification Branch</div>
            <div className="text-xs font-mono text-center mt-1">
              {VIT_CONFIG.model.numClasses} classes × {VIT_CONFIG.model.maxObjects} queries
            </div>
          </div>
          <div className="bg-white rounded p-2 flex-1 ml-2">
            <div className="text-sm text-center">Box Regression Branch</div>
            <div className="text-xs font-mono text-center mt-1">
              4 coordinates × {VIT_CONFIG.model.maxObjects} queries
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-indigo-100 rounded-lg p-4">
      <h4 className="font-medium mb-2">Object Predictions</h4>
      <div className="space-y-2">
        <div className="bg-white rounded p-2">
          <div className="text-sm">Per Object:</div><div className="ml-4 text-xs text-gray-600">
            • Class probabilities ({VIT_CONFIG.model.numClasses} classes)<br />
            • Bounding box (x, y, width, height)<br />
            • Confidence score
          </div>
        </div>
        <div className="text-xs text-gray-600 ml-2">
          Up to {VIT_CONFIG.model.maxObjects} objects detected per image
        </div>
      </div>
    </div>
  </div>
);

const ArchitectureDetails = () => {
  const details = [
    { label: 'Input Resolution', value: `${VIT_CONFIG.image.size}×${VIT_CONFIG.image.size}` },
    { label: 'Patch Size', value: `${VIT_CONFIG.image.patchSize}×${VIT_CONFIG.image.patchSize}` },
    { label: 'Embedding Dim', value: VIT_CONFIG.model.embeddingDim },
    { label: 'Object Queries', value: VIT_CONFIG.model.maxObjects },
    { label: 'COCO Classes', value: VIT_CONFIG.model.numClasses },
    { label: 'Transformer Layers', value: VIT_CONFIG.model.numLayers },
    { label: 'Attention Heads', value: VIT_CONFIG.model.numHeads }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {details.map(({ label, value }) => (
        <div key={label} className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600">{label}</div>
          <div className="font-medium mt-1">{value}</div>
        </div>
      ))}
    </div>
  );
};