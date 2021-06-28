const colors = {
  // 'white': '#FFFFFF',
  // 'black': '#232323',
  // 'gray': '#6B7280',
  // 'red': '#DC2626',
  // 'yellow': '#FBBF24',
  // 'orange': '#F97316',
  // 'amber': '#F59E0B',
  // 'green': '#10B981',
  // 'emerald': '#10B981',
  // 'cyan': '#06B6D4',
  // 'blue': '#3B82F6',
  // 'indigo': '#6366F1',
  // 'purple': '#8B5CF6',
  // 'fuschia': '#D946EF',
  // 'pink': '#EC4899',
  // 'rose': '#F43F5E',
  'red': '#FFADAD',
  'orange': '#FFD6A5',
  'yellow': '#FDFFB6',
  'green': '#CAFFBF',
  'blue': '#9BF6FF',
  'indigo': '#A0C4FF',
  'purple': '#BDB2FF',
  'pink': '#FFC6FF',
};

const layer_order = [
  'body',
  'stomach',
  'feet',
  'beak',
  'shell',
];

const layers = {
  'body': {
    'tinted': true,
  },
  'stomach': {},
  'feet': {},
  'eyes': {
    'tinted': true,
  },
  'beak': {},
  'shell': {
    'tinted': true,
  },
};

module.exports = {
  colors,
  layer_order,
  layers,
};