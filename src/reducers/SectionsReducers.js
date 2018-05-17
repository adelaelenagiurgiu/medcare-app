const INITIAL_STATE = {
  sections: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'store_sections':
      return { ...state, sections: action.payload };
    default:
      return state;
  }
};
