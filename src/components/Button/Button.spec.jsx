const { render, screen, fireEvent } = require("@testing-library/react");
import { Button } from ".";
describe("Home", () => {
  it("deveria renderizar o botão e checar o testo", () => {
    render(<Button text="Lore more" />);

    expect.assertions(1);
    const button = screen.getByText(/lore more/i);
    expect(button).toBeInTheDocument();
  });
  it("deviria clickar no botão", () => {
    const fn = jest.fn();
    render(<Button text="Lore more" onClick={fn} />);

    const button = screen.getByRole('button', { name: /lore more/i });

    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1)
  });
});
