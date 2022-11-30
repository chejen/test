import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
  selectResult,
  selectResultFromAry,
  selectResultAry,
  selectCachedResult,
} from './counterSlice';

describe('counter reducer', () => {
  const initialState = {
    value: 3,
    status: 'idle',
    counter: {
      value: 0,
    },
  };
  // it('should handle initial state', () => {
  //   expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
  //     value: 0,
  //     status: 'idle',
  //     counter: {
  //       value: 0,
  //     },
  //   });
  // });

  // it('should handle increment', () => {
  //   const actual = counterReducer(initialState, increment());
  //   expect(actual.value).toEqual(4);
  // });

  
  it('test1-selectResult-premitive', () => {
    let result = selectResult(initialState, 5);
    expect(result).toEqual(5);
    result = selectResult(initialState, 5);
    expect(result).toEqual(5);
    console.log('----------');
  });
  it('test2-selectResult-premitive-interleaving', () => {
    let result = selectResult(initialState, 3);
    expect(result).toEqual(3);
    result = selectResult(initialState, 4);
    expect(result).toEqual(4);
    result = selectResult(initialState, 3);
    expect(result).toEqual(3);
    console.log('----------');
  });
  it('test3-selectResultFromAry-reference-same', () => {
    const arr = [5];
    let result = selectResultFromAry(initialState, arr);
    expect(result).toEqual(5);
    result = selectResultFromAry(initialState, arr);
    expect(result).toEqual(5);
    console.log('----------');
  });
  it('test4-selectResultFromAry-reference-diff', () => {
    let result = selectResultFromAry(initialState, [4]);
    expect(result).toEqual(4);
    result = selectResultFromAry(initialState, [4]);
    expect(result).toEqual(4);
    console.log('-----4-----');
  });
  it('test5-selectResultAry-reference-same', () => {
    const arr = [7];
    let result = selectResultAry(initialState, arr);
    expect(result).toEqual(7);
    result = selectResultAry(initialState, arr);
    expect(result).toEqual(7);
    console.log('-----5-----');
  });
  it('test6-selectResultAry-reference-diff', () => {
    let result = selectResultAry(initialState, [8]);
    expect(result).toEqual(8);
    result = selectResultAry(initialState, [8]);
    expect(result).toEqual(8);
    console.log('-----6-----');
  });
  it('test7-what-if-state-changed', () => {
    let result = selectResult(initialState, 2);
    expect(result).toEqual(2);
    result = selectResult({...initialState}, 2);
    expect(result).toEqual(2);
    console.log('-----7-----');
  });

  // it('should handle decrement', () => {
  //   const actual = counterReducer(initialState, decrement());
  //   expect(actual.value).toEqual(2);
  // });

  // it('should handle incrementByAmount', () => {
  //   const actual = counterReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });
});
