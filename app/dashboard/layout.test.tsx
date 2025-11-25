import { render, screen } from '@testing-library/react';
import DashboardLayout from './layout';

// Mock the AppSidebar component to avoid testing its internal logic here
jest.mock('@/components/ui/app-sidebar', () => ({
  AppSidebar: () => <div data-testid="mock-app-sidebar" />,
}));

describe('DashboardLayout', () => {
  it('renders the AppSidebar and children correctly', () => {
    render(
      <DashboardLayout>
        <p>Test Child</p>
      </DashboardLayout>
    );

    // Check if the mock AppSidebar is rendered
    expect(screen.getByTestId('mock-app-sidebar')).toBeInTheDocument();

    // Check if the children are rendered
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
