import { connect } from 'react-redux';

export const createConnectComponent = (Component, mapStateToProps) => (
    connect(mapStateToProps)(Component)
);