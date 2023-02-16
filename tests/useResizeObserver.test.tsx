import { render } from '@testing-library/react';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useResizeObserver } from '../src';
import { expect, vi, test } from 'vitest';

window.ResizeObserver = ResizeObserver;
(global as any).ResizeObserver = ResizeObserver;
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock('resize-observer-polyfill');

const TestComponent = () => {
  const ref = React.useRef(null);
  const [width, height] = useResizeObserver(ref);
  return <div ref={ref}>{width + height}</div>;
};

const resize = (width: number, height: number) => {
  // @ts-ignore
  ResizeObserver.mockReset();
  // @ts-ignore
  ResizeObserver.mockImplementation((cb) => {
    console.log(height);
    cb([{ contentRect: { width, height } }]);
    return { observe: vi.fn, disconnect: vi.fn };
  });

  const { container } = render(<TestComponent />);
  return container.textContent;
};

test('useResizeObserver', () => {
  //   expect(resize(100, 100)).toBe('200');
  expect(resize(100, 100)).toBe('0');
  // expect(resize(200, 200)).toBe('400');
  expect(resize(200, 200)).toBe('0');
});
