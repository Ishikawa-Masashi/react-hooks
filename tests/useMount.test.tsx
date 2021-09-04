import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { useMount } from '../src/useMount';

describe('useMount', () => {
  it('fires a callback', () => {
    const onMount = jest.fn();

    const TestComponent: React.FunctionComponent = () => {
      useMount(() => {
        onMount();
      });

      return <>Test Component</>;
    };

    expect(onMount).toBeCalledTimes(0);
    const wrapper = render(<TestComponent />);
    expect(onMount).toBeCalledTimes(1);
    wrapper.unmount();
    expect(onMount).toBeCalledTimes(1);
  });
});
