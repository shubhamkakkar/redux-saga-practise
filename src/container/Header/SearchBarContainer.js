import React, { Component } from "react"
import {
    View, Text, Container, Item, Input,
} from "native-base";
import { Modal, TouchableOpacity, ScrollView } from "react-native"
import searchJSON from "../../api/countryJSON/searchData.json"
import CountryCodePicker from "../../components/CountryCodePicker/CountryCodePicker"
import CategoryPicker from "../../components/CategoryPicker/CategoryPicker"
import ModalCloser from "../../components/ModalCloser/ModalCloser.js";
import HeaderComponent from "../../components/Header/Header"

const ModalHOc = props => (
    <Modal
        animationType="slide"
        transparent={false}
        visible={props.visible}
        onRequestClose={props.handleClose}
    >
        {props.children}
    </Modal>
)

class SearchBarContainer extends Component {

    state = {
        country: [],
        countryCodeModalOpen: false,
        categoryModalOpen: false,
    }

    componentWillMount() {
        this.setState({
            country: searchJSON.countryCodeAndName,
            category: searchJSON.category
        })
    }

    handleButtons = res => {
        switch (res) {
            case "Country": {
                this.setState({ countryCodeModalOpen: true })
                break;
            }
            case "Category": {
                this.setState({ categoryModalOpen: true })
                break;
            }
            case "Top Headlines": {
                break;
            }
            case "All Stories": {
                break;
            }
        }
    }

    handleClose = () => this.setState({ categoryModalOpen: false, countryCodeModalOpen: false })


    render() {
        return (
            <Container>
                <HeaderComponent title={"Search"} />
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {
                        [
                            "Top Headlines", "All Stories"
                        ].map((res, index) => (
                            <View key={res}>
                                <TouchableOpacity
                                    style={{
                                        marginBottom: 10,
                                        backgroundColor: "#3d5afe",
                                        borderColor: "#3d5afe",
                                        borderRadius: 25,
                                        alignItems: 'center',
                                        justifyContent: "center"
                                    }}
                                    onPress={() => this.handleButtons(index)}
                                >
                                    <Text style={{
                                        color: "white",
                                        padding: 10,
                                    }}>  {res} </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }

                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    margin: 30
                }}>
                    <Item rounded>
                        <Input placeholder='Rounded Textbox' />
                    </Item>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {
                        [
                            "Country", "Category"
                        ].map(res => (
                            <View key={res}>
                                <TouchableOpacity
                                    style={{
                                        marginBottom: 10,
                                        backgroundColor: "#3d5afe",
                                        borderColor: "#3d5afe",
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }}
                                    onPress={() => this.handleButtons(res)}
                                >
                                    <Text style={{
                                        color: "white",
                                        padding: 10,
                                    }}> Select {res} </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }

                </View>
                <ModalHOc visible={this.state.countryCodeModalOpen} handleClose={this.handleClose}>
                    <ScrollView style={{ flexGrow: 1 }}>
                        <CountryCodePicker country={this.state.country} />
                    </ScrollView>
                    <ModalCloser handleClose={this.handleClose} />
                </ModalHOc>
                <ModalHOc visible={this.state.categoryModalOpen} handleClose={this.handleClose}>
                    <View style={{ flexGrow: 1 }}>
                        <CategoryPicker category={this.state.category} />
                    </View>
                    <ModalCloser handleClose={this.handleClose} />
                </ModalHOc>
            </Container>
        )
    }
}
export default SearchBarContainer
