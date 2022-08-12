import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { useUnmount } from '../src';
import { describe, it, expect, vi } from 'vitest';

describe('useUnmount', () => {
  it('fires a callback', () => {
    const onUnmount = vi.fn();

    const TestComponent: React.FunctionComponent = () => {
      useUnmount(() => {
        onUnmount();
      });

      return <>Test Component</>;
    };

    expect(onUnmount).toBeCalledTimes(0);
    const wrapper = render(<TestComponent />);
    expect(onUnmount).toBeCalledTimes(0);
    ReactTestUtils.act(() => {
      wrapper.unmount();
    });
    expect(onUnmount).toBeCalledTimes(1);
  });
});
