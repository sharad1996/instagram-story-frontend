import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Story from '../Story';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props: any) => <i {...props}></i>,
}));

describe('Story component', () => {
  const mockProps = {
    src: 'test-image.jpg',
    name: 'Test Story',
    onPrev: jest.fn(),
    onNext: jest.fn(),
    progress: 50,
    onClose: jest.fn(),
  };

  it('should render the component correctly and match snapshot', () => {
    const { asFragment } = render(<Story {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the correct image', () => {
    render(<Story {...mockProps} />);
    const img = screen.getByAltText('Story');
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });

  it('should display the correct name', () => {
    render(<Story {...mockProps} />);
    const nameElement = screen.getByText('Test Story');
    expect(nameElement).toBeInTheDocument();
  });

  it('should set the progress bar width based on progress prop', () => {
    render(<Story {...mockProps} />);
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('should call onPrev when the left half is clicked', () => {
    render(<Story {...mockProps} />);
    const leftHalf = screen.getByTestId('left-half');
    fireEvent.click(leftHalf);
    expect(mockProps.onPrev).toHaveBeenCalled();
  });

  it('should call onNext when the right half is clicked', () => {
    render(<Story {...mockProps} />);
    const rightHalf = screen.getByTestId('right-half');
    fireEvent.click(rightHalf);
    expect(mockProps.onNext).toHaveBeenCalled();
  });

  it('should call onClose when the close button is clicked', () => {
    render(<Story {...mockProps} />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
