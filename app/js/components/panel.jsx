'use strict';

var React = require('react');
var $ = require('js/shims/jquery');

var Draggable = require('react-draggable');

var Panel = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        height: React.PropTypes.number,
        width: React.PropTypes.number,
        onClose: React.PropTypes.func.isRequired,
        show: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function() {
        return {
            height: 400,
            width: 450
        };
    },

    componentDidMount: function() {
        $(this.refs.container.getDOMNode()).hide();
    },

    componentDidUpdate: function() {
        if (this.props.show) {
            $(this.refs.container.getDOMNode()).fadeIn(500);
        } else {
            $(this.refs.container.getDOMNode()).fadeOut(500);
        }
    },

    render: function() {
        return (
            <Draggable handle='.drag-handle' zIndex={999999999}>
                <div ref="container" style={{
                    position: 'absolute',
                    zIndex: '999999999',
                    left: (($(window.document).width() - this.props.width) / 2) + 'px'
                }}>
                    <div className="drag-handle" style={{
                        backgroundColor: '#184F82',
                        border: '1px solid black',
                        borderBottom: 0, // Avoid the border appearing thicker on the bottom edge.
                        borderTopLeftRadius: 7,
                        borderTopRightRadius: 7,
                        color: '#FFD800',
                        cursor: 'move',
                        fontSize: '110%',
                        fontWeight: 'bold',
                        lineHeight: '1.75',
                        marginLeft: 10,
                        paddingLeft: 10,
                        width: 250
                    }}>
                        {this.props.title}
                    </div>
                    <div onClick={this.props.onClose} style={{
                        background: 'url("//192.168.0.37:8080/assets/ui/close.png") no-repeat scroll 0 0 transparent',
                        width: '21px',
                        height: '21px',
                        top: 0,
                        right: 0,
                        position: 'fixed',
                        cursor: 'pointer'
                    }}>
                    </div>
                    <div style={{
                        overflow: 'auto',
                        width: this.props.width + 'px',
                        border: '2px solid black',
                        backgroundColor: '#0268AC',
                        borderRadius: '10px',
                        padding: '10px'
                    }}>
                        <div style={{
                            overflow: 'auto',
                            overflowX: 'hidden',
                            height: this.props.height + 'px',
                            padding: '5px'
                        }}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
});

module.exports = Panel;
