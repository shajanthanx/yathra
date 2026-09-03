/**
 * Overlay components. These carry destructive confirmations and the topic
 * status control, so it matters that they only show when asked and that their
 * actions fire exactly once.
 */
import { render, screen, fireEvent } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { Text as RNText } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { ConfirmDialog } from '../ConfirmDialog';
import { setLanguage } from '@/store/appStore';
import { ThemeProvider } from '@/theme/ThemeProvider';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

function renderUI(ui: ReactElement) {
  return render(
    <SafeAreaProvider initialMetrics={metrics}>
      <ThemeProvider>{ui}</ThemeProvider>
    </SafeAreaProvider>,
  );
}

beforeEach(() => {
  setLanguage('en');
});

describe('BottomSheet', () => {
  it('shows nothing while closed', () => {
    renderUI(
      <BottomSheet visible={false} onClose={jest.fn()} title="Status">
        <RNText>Sheet body</RNText>
      </BottomSheet>,
    );
    expect(screen.queryByText('Sheet body')).toBeNull();
  });

  it('shows its title, content and footer when open', () => {
    renderUI(
      <BottomSheet
        visible
        onClose={jest.fn()}
        title="Status"
        footer={<Button label="Save" onPress={jest.fn()} />}
      >
        <RNText>Sheet body</RNText>
      </BottomSheet>,
    );
    expect(screen.getByText('Status')).toBeTruthy();
    expect(screen.getByText('Sheet body')).toBeTruthy();
    expect(screen.getByText('Save')).toBeTruthy();
  });

  it('closes from the close control', () => {
    const onClose = jest.fn();
    renderUI(
      <BottomSheet visible onClose={onClose} title="Status">
        <RNText>Sheet body</RNText>
      </BottomSheet>,
    );
    fireEvent.press(screen.getAllByRole('button', { name: 'Close' })[0]!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('ConfirmDialog', () => {
  it('shows nothing while closed', () => {
    renderUI(
      <ConfirmDialog
        visible={false}
        title="Reset all data?"
        confirmLabel="Reset"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );
    expect(screen.queryByText('Reset all data?')).toBeNull();
  });

  it('states plainly what a destructive action will do', () => {
    renderUI(
      <ConfirmDialog
        visible
        title="Reset all data?"
        body="This will permanently remove your local A/L progress."
        confirmLabel="Reset"
        destructive
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );
    expect(screen.getByText('Reset all data?')).toBeTruthy();
    expect(screen.getByText('This will permanently remove your local A/L progress.')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('confirms once', () => {
    const onConfirm = jest.fn();
    renderUI(
      <ConfirmDialog
        visible
        title="Delete this task?"
        confirmLabel="Delete"
        destructive
        onConfirm={onConfirm}
        onCancel={jest.fn()}
      />,
    );
    fireEvent.press(screen.getByText('Delete'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('cancels from the cancel action', () => {
    const onCancel = jest.fn();
    renderUI(
      <ConfirmDialog
        visible
        title="Delete this task?"
        confirmLabel="Delete"
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />,
    );
    fireEvent.press(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('translates its own default cancel label', () => {
    setLanguage('ta');
    renderUI(
      <ConfirmDialog
        visible
        title="நீக்கவா?"
        confirmLabel="நீக்கு"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );
    expect(screen.getByText('ரத்துச் செய்')).toBeTruthy();
  });
});
