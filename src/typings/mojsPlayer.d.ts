declare module "mojs-player" {
    import { Timeline, Shape } from 'mo-js';

    class MojsPlayer {
        constructor(opts: MojsPlayer.Options);
    }

    namespace MojsPlayer {

        interface Options {

            add: Timeline | Shape;

            /**
             *  class name to add to main HTMLElement
             */
            className?: string;

            /**
             *  determines if should preserve state on page reload
             */
            isSaveState?: boolean;

            /**
             *  playback state
             */
            isPlaying?: boolean;

            /**
             *  initial progress
             */
            progress?: number;

            /**
             *  determines if it should repeat after completion
             */
            isRepeat?: boolean;

            /**
             *  determines if it should have bounds
             */
            isBounds?: boolean;

            /**
             *  left bound position  [0...1]
             */
            leftBound?: number;

            /**
             *  right bound position [0...1]
             */
            rightBound?: number;

            /**
             *  determines if speed control should be open
             */
            isSpeed?: boolean;

            /**
             *  speed value
             */
            speed?: number;

            /**
             *  determines if the player should be hidden
             */
            isHidden?: boolean;

            /**
             *  step size for player handle - for instance, after page reload -
             *  player should restore timeline progress - the whole timeline will be updated
             *  incrementally with the `precision` step size until the progress will be met.
             */
            precision?: number;

            /**
             *  name for the player - mainly used for localstorage identifier,
             *  use to distuguish between multiple local players
             */
            name?: string;
        }
    }
    export = MojsPlayer;

}
