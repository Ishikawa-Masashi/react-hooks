import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { useBoolean, IUseBooleanCallbacks } from '../src';
import { validateHookValueNotChanged } from './testUtilities';

describe('useBoolean', () => {
  it('respects initial value', () => {
    let value: boolean;
    const TestComponent: React.FunctionComponent<{ initialValue: boolean }> = ({
      initialValue,
    }) => {
      [value] = useBoolean(initialValue);
      return <div />;
    };
    render(<TestComponent initialValue={true} />);
    expect(value!).toBe(true);
    render(<TestComponent initialValue={false} />);
    expect(value!).toBe(false);
  });
  validateHookValueNotChanged('returns the same callbacks', () => {
    const [, { setTrue, setFalse, toggle }] = useBoolean(true);
    return [setTrue, setFalse, toggle];
  });
  it('updates the value', () => {
    let value: boolean;
    let callbacks: IUseBooleanCallbacks;
    const TestComponent: React.FunctionComponent = () => {
      [value, callbacks] = useBoolean(true);
      return <div>{value}</div>;
    };
    render(<TestComponent />);
    expect(value!).toBe(true);
    act(() => callbacks.setFalse());
    expect(value!).toBe(false);
    act(() => callbacks.setFalse());
    expect(value!).toBe(false);
    act(() => callbacks.setTrue());
    expect(value!).toBe(true);
  });
  it('handles toggling', () => {
    let value: boolean;
    let callbacks: IUseBooleanCallbacks;
    const TestComponent: React.FunctionComponent = () => {
      [value, callbacks] = useBoolean(true);
      return <div />;
    };
    render(<TestComponent />);
    // Toggle the value
    act(() => callbacks.toggle());
    // correct new value
    expect(value!).toBe(false);
    // Toggle again
    act(() => callbacks.toggle());
    expect(value!).toBe(true);
  });
});
