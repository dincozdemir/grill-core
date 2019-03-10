export default {
  cells: {
    111: {},
    222: {},
    333: {},
    444: {},
    555: {}
  },
  lanes: {
    123: {
      cells: [111, 333]
    },
    234: {
      cells: [222, 444, 555]
    },
    byId: [123, 234]
  },
  editingCells: { 111: 1 }
};
