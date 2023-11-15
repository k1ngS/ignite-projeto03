import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/react')

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "authenticated",
    });

    render(
      <SubscribeButton />
    )
  
    expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null, 
      status:'authenticated',
    });

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe Now');
    fireEvent.click(subscribeButton);

    const signInMocked = mocked(signIn);
    signInMocked.mockReturnValueOnce({} as any);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects tp posts when user already has a subscription', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ 
        data: { activeSubscription: 'fake-active-subscription',expires: 'fake-expires'},
        status: 'authenticated',
    } as any);

    const router = useRouter();

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe Now');
    fireEvent.click(subscribeButton);

    expect(router.push).toHaveBeenCalled();
  });
});

