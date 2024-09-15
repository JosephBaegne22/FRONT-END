import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { AuthContext } from "../store/auth-context";
import * as websocket from "../util/websocket";
import GameScreen from "./GameScreen";

// Mock the dependencies
jest.mock("../util/websocket", () => ({
  getSocket: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("GameScreen", () => {
  const mockNavigation = {
    replace: jest.fn(),
  };

  const mockSocket = {
    send: jest.fn(),
  };

  beforeEach(() => {
    websocket.getSocket.mockReturnValue(mockSocket);
  });

  it("renders correctly and handles button presses", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <GameScreen navigation={mockNavigation} />
      </AuthContext.Provider>
    );

    // Check if main UI elements are present
    expect(getByTestId("settings-button")).toBeTruthy();
    expect(getByTestId("left-button")).toBeTruthy();
    expect(getByTestId("right-button")).toBeTruthy();
    expect(getByTestId("forward-button")).toBeTruthy();
    expect(getByTestId("backward-button")).toBeTruthy();
    expect(getByTestId("brake-button")).toBeTruthy();

    // Test button presses
    fireEvent.press(getByTestId("left-button"));
    expect(mockSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ cmd: 1, data: [0, 0, 4000, 4000] })
    );

    fireEvent.press(getByTestId("right-button"));
    expect(mockSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ cmd: 1, data: [4000, 4000, 0, 0] })
    );

    fireEvent.press(getByTestId("forward-button"));
    expect(mockSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ cmd: 1, data: [2000, 2000, 2000, 2000] })
    );

    fireEvent.press(getByTestId("backward-button"));
    expect(mockSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ cmd: 1, data: [-2000, -2000, -2000, -2000] })
    );

    fireEvent.press(getByTestId("brake-button"));
    expect(mockSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ cmd: 1, data: [0, 0, 0, 0] })
    );

    // Test settings button navigation
    fireEvent.press(getByTestId("settings-button"));
    expect(mockNavigation.replace).toHaveBeenCalledWith("InGameMenu");
  });
});
