import { renderHook } from '@testing-library/react-hooks';
import { useMount } from '../src';
import { describe, it, expect, vi } from 'vitest';

describe('useMount', () => {
  it('fires a callback', () => {
    const onMount = vi.fn();

    const result = renderHook(() => useMount(onMount));

    expect(onMount).toHaveBeenCalledTimes(1);
    result.unmount();
    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
