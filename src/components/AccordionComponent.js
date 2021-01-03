import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    }
});

export default class AccordionComponent extends Component {
    state = {
        activeSections: [],
    };

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                {section.content}
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        const { sections, containerStyle } = this.props;
        return (
            <Accordion
                containerStyle={containerStyle}
                sections={sections}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        );
    }
}