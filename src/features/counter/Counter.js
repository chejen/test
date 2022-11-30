import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { createCachedSelector } from 're-reselect';
import {
  decrement,
  increment,
  resetTo0,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

const selectResult = createSelector(selectCount, (count) => {
  console.log('[debug] selectResult');
  return count * 2;
});

const selectCachedResult = createCachedSelector(
  // inputSelectors
  selectCount,

  // resultFunc
  (count) => {
    console.log('[debug] selectCachedResult');
    return count * 2;
  },
)(
  // re-reselect keySelector (receives selectors' arguments)
  // Use "libraryName" as cacheKey
  (_state_, count) => {
    console.log('@@@', { count });
    return count;
  }
);

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  // const res = useSelector(selectResult);
  const res = selectCachedResult(count);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        {' | '}
        <span className={styles.value}>{res}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(resetTo0())}
        >
          Reset to 0
        </button>
      </div>
    </div>
  );
}
