import "./Menu.css";
import Keyboard from "./Keyboard/Keyboard";
import Next from "./Next/Next";
import Score from "./Score/Score";

const Menu = function (props: { pauseGame: Function }) {
    const { pauseGame } = props;

    return (
        <div className="menu">
            <Next />
            <Score />
            <button className="pause-game" onClick={() => pauseGame()}>
                Pause Game
            </button>
            <Keyboard />
        </div>
    );
};

export default Menu;
