import { render, screen } from '@testing-library/react'
import {  mocked } from 'jest-mock'
import Posts, { getStaticProps } from '../../pages/posts'
import { createClient } from '../../services/prismic'

const posts = [
  {
    slug: 'fake-slug',
    title: 'My new post',
    excerpt: 'Fake excerpt 1',
    updatedAt: '31 de dezembro de 2019'
  }
] as Post[];

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts}/>)

    expect(screen.getByText("My new post")).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const mockPrismicClient = {
      get: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'fake-slug',
            data: {
              title: [{ text: 'Fake title 1' }],
              content: [
                {
                  type: 'paragraph',
                  text: 'Fake excerpt 1',
                },
              ],
            },
            last_publication_date: '2020-01-01',
          },
        ],
      }),
    };
    const getPrismicClientMocked = mocked(createClient);
    getPrismicClientMocked.mockReturnValueOnce(mockPrismicClient);

    const response = await getStaticProps({ previewData: undefined })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'fake-slug',
              title: 'Fake title 1',
              excerpt: 'Fake excerpt 1',
              updatedAt: '31 de dezembro de 2019',
            },
          ],
        },
      })
    );
  });
});