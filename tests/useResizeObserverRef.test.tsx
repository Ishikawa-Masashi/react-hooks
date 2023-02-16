/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { describe, test, expect, vi } from 'vitest';
import {
  render,
  act,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { useResizeObserverRef } from '../src/useResizeObserverRef';

describe('useResizeObserverRef', () => {
  test('should be defined', () => {
    expect.hasAssertions();
    expect(useResizeObserverRef).toBeDefined();
  });
  test('its observer should get called on resize', async () => {
    expect.hasAssertions();
    const observerFn = vi.fn();
    const unObserverFn = vi.fn();
    const disconnetFn = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: observerFn,
      unobserve: unObserverFn,
      disconnect: disconnetFn,
    }));

    function App() {
      const [value, setValue] = React.useState(0);
      const [ref] = useResizeObserverRef(() => {
        setValue(1);
      });
      return (
        <div ref={ref} data-testid="value">
          {value}
        </div>
      );
    }

    const { unmount } = render(<App />);
    const valueElement = screen.getByTestId('value');
    expect(valueElement.innerHTML).toBe('0');
    act(() => {
      fireEvent.resize(valueElement);
    });
    await waitFor(() => expect(observerFn).toHaveBeenCalled());
    act(() => {
      unmount();
    });
    await waitFor(() => expect(disconnetFn).toHaveBeenCalled());
    vi.restoreAllMocks();
  });
});
