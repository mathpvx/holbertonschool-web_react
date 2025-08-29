import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const testList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Latest notification</strong>' } }
];

describe('Notifications component', () => {
  test('always displays "Your notifications" text', () => {
    render(<Notifications />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('does NOT display list, text or button when displayDrawer=false', () => {
    render(<Notifications displayDrawer={false} list={testList} />);
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('renders notifications paragraph when displayDrawer=true', () => {
    render(<Notifications displayDrawer={true} list={testList} />);
    const title = screen.getByText(/here is the list of notifications/i);
    expect(title).toBeInTheDocument();
  });

  test('renders the close button when displayDrawer=true', () => {
    render(<Notifications displayDrawer={true} list={testList} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('renders 3 list items when displayDrawer=true', () => {
    render(<Notifications displayDrawer={true} list={testList} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });

  // NEW per requirements: clicking the menu item calls handleDisplayDrawer
  test('calls handleDisplayDrawer when clicking the menu item', () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        displayDrawer={false}
        list={testList}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );
    // The menu item is the "Your notifications" text
    const menuItem = screen.getByText(/your notifications/i);
    fireEvent.click(menuItem);
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  // NEW per requirements: clicking the close button calls handleHideDrawer
  test('calls handleHideDrawer when clicking the close button', () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        list={testList}
        handleHideDrawer={handleHideDrawer}
      />
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  test('displays "No new notification for now" when list is empty', () => {
    render(<Notifications displayDrawer={true} list={[]} />);
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  });

  test('logs correct message when a notification is clicked', () => {
    console.log = jest.fn();
    render(<Notifications displayDrawer={true} list={testList} />);
    const items = screen.getAllByRole('listitem');
    fireEvent.click(items[0]);
    expect(console.log).toHaveBeenCalledWith('Notification 1 has been marked as read');
    console.log.mockRestore();
  });

  test('does not re-render list if list length stays the same and drawer state unchanged', () => {
    const { rerender } = render(<Notifications displayDrawer={true} list={testList} />);
    const initialItems = screen.getAllByRole('listitem').map((el) => el.textContent);
    const sameLengthList = [...testList];
    rerender(<Notifications displayDrawer={true} list={sameLengthList} />);
    const itemsAfterRerender = screen.getAllByRole('listitem').map((el) => el.textContent);
    expect(itemsAfterRerender).toEqual(initialItems);
  });

  test('re-renders if list length increases', () => {
    const { rerender } = render(<Notifications displayDrawer={true} list={testList} />);
    expect(screen.getAllByRole('listitem').length).toBe(3);
    const longerList = [...testList, { id: 4, type: 'default', value: 'New one' }];
    rerender(<Notifications displayDrawer={true} list={longerList} />);
    expect(screen.getAllByRole('listitem').length).toBe(4);
  });

  // NEW: ensure we re-render when displayDrawer toggles
  test('re-renders when displayDrawer changes', () => {
    const { rerender } = render(<Notifications displayDrawer={false} list={testList} />);
    expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
    rerender(<Notifications displayDrawer={true} list={testList} />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });
});
