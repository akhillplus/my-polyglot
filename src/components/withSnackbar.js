import React from 'react';
// import hoistNonReactStatics from 'hoist-non-react-statics';
// import getDisplayName from './utils/getDisplayName';
import SnackbarContext from './SnackbarContext';

const withSnackbar = (Component) => {
    const WrappedComponent = React.forwardRef((props, ref) => (
        <SnackbarContext.Consumer>
            {context => (
                <Component
                    {...props}
                    ref={ref}
                    enqueueSnackbar={context.handleEnqueueSnackbar}
                    closeSnackbar={context.handleCloseSnackbar}
                    // additions start
                    subspecsCache={context.subspecsCache}
                    wordlistCache={context.wordlistCache}
                    specFields={context.specFields}
                    stateCache={context.stateCache}
                    openModalMode={context.handleOpenModal}
                    closeModalMode={context.handleCloseModal}
                    // additions stop
                />
            )}
        </SnackbarContext.Consumer>
    ));

    // if (process.env.NODE_ENV !== 'production') {
    //     WrappedComponent.displayName = `WithSnackbar(${getDisplayName(Component)})`;
    // }

    // hoistNonReactStatics(WrappedComponent, Component);

    return WrappedComponent;
};

export default withSnackbar;
