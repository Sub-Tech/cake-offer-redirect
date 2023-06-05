import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/pages';

jest.mock('adzuki-client-react', () => {
  return {
    useAdzuki: () => ({
      adSlotAds: [],
      err: ""
    })
  };
});

// testing react render process
describe('Home renders correct verson', () => {
  const adzukiConfig = {
    geo: 'UK',
    adzukiId: 18779 // uk testing affiliate
  }
  const siteConfig = {
    logo: ""
  }
  it('renders CustomRenderVersion', () => {
    render(
      <Home
        config={adzukiConfig}
        displayConfig={{
          version: 'CustomRenderVersion'
        }}
        siteConfig={siteConfig}
      />
    );

    const heading = screen.getByText(/Your exclusive deals expire in/);

    expect(heading).toBeInTheDocument();
  });

  it('renders LocationVersion', () => {
    render(
      <Home
        config={adzukiConfig}
        displayConfig={{
          version: 'LocationVersion'
        }}
        siteConfig={siteConfig}
      />
    );

    const heading = screen.getByText(/you can choose/);

    expect(heading).toBeInTheDocument();
  });
});



// more of a unit test example
const exampleCuberFunction = (argInt = 0) => argInt * argInt * argInt
describe('exampleCuber is cubing', () => {
  it('passing in positive int', () => {
    expect(exampleCuberFunction(3)).toEqual(27)
  });

  it('passing in negative int', () => {
    expect(exampleCuberFunction(-3)).toEqual(-27)
  });

  it('passing in no arg', () => {
    expect(exampleCuberFunction()).toEqual(0)
  });
});