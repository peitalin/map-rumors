
/// <reference path="react.d.ts" />

declare namespace __React {

    interface TransitionGroupProps {
        component?: ReactType;
        childFactory?: (child: ReactElement<any>) => ReactElement<any>;
    }

    type TransitionGroup = ComponentClass<TransitionGroupProps>;

    namespace __Addons {
        export var TransitionGroup: __React.TransitionGroup;
    }
}

declare module "react-transition-group/CSSTransitionGroup" {
    var CSSTransitionGroup: __React.TransitionGroup;
    type CSSTransitionGroup = __React.TransitionGroup;
    export = CSSTransitionGroup;
}
