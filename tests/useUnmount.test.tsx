import * as React from 'react';
import { render } from '@testing-library/react';
import { useUnmount } from '../src/useUnmount';

describe('useUnmount', () => {
  it('fires a callback', () => {
    const onUnmount = jest.fn();

    const TestComponent: React.FunctionComponent = () => {
      useUnmount(() => {
        onUnmount();
      });

      return <>Test Component</>;
    };

    expect(onUnmount).toBeCalledTimes(0);
    const wrapper = render(<TestComponent />);
    expect(onUnmount).toBeCalledTimes(0);
    wrapper.unmount();
    expect(onUnmount).toBeCalledTimes(1);
  });
});
