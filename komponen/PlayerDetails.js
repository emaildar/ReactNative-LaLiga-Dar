import React, {Component} from 'react'
import axios from 'axios';
import { Image, ScrollView } from 'react-native';
import { Container, Card, CardItem, Left, Body, Right, Text, Thumbnail } from 'native-base';

class PlayerDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: "",
            loadData: false,
            idPlayer: this.props.navigation.getParam("idPlayer")
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("playerName"),
            headerStyle: {
                backgroundColor: "purple"
            },
            headerTintColor: "white"
        }
    }

    componentDidMount() {
        this.setState({
            loadData: true
        })
        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${this.state.idPlayer}`).then((x) => {
            this.setState({
                detail: x.data.players[0],
                loadData: false
            })
        })
    }

    displayDetails() {
        return (
            <Card transparent style={{ flex: 0, width: 350, alignSelf: "center", marginTop: 10 }}>
                <CardItem>
                    <Left>
                        <Thumbnail style={{ maxWidth: 30, maxHeight: 30 }} source={{ uri: this.props.navigation.getParam("playerPhoto") }} />
                        <Body>
                            <Text>{this.props.navigation.getParam("playerName")}</Text>
                            <Text note>{this.props.navigation.getParam("playerNationality")}</Text>
                        </Body>
                    </Left>
                    <Right>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={{ uri: this.props.navigation.getParam("playerPhoto") }} style={{ height: 200, width: "100%", flex: 1 }} />
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{ fontSize: 12 }}>{this.props.navigation.getParam("playerDesc")}</Text>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    {this.displayDetails()}
                </ScrollView>
            </Container>
        )
    }
}

export default PlayerDetails;