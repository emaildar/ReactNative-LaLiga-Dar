import React, {Component} from 'react'
import axios from 'axios';
import { ScrollView } from 'react-native';
import { Container, Left, Body, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';

class ListPlayers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pemainList: "",
            loadData: false,
            idTeam: this.props.navigation.getParam("idTeam")
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("teamName"),
            headerStyle: {
                backgroundColor: "purple"
            },
            headerTintColor: "white"
        }
    }

    componentDidMount() {
        this.setState({
            loadData: true
        });
        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${this.state.idTeam}`).then((x) => {
            this.setState({
                pemainList: x.data.player,
                loadData: false
            });
        });
    }

    displayPlayers() {
        return this.state.pemainList.map((val, i) => {
            var idPlayer = val.idPlayer;
            var playerName = val.strPlayer;
            var playerPhoto = val.strThumb;
            var playerPosition = val.strPosition;
            var playerDesc = val.strDescriptionEN;
            var playerNationality = val.strNationality;

            return (
                <ListItem key={i} avatar onPress={() => {
                    this.props.navigation.navigate("PlayerDetails", {
                        idPlayer: idPlayer,
                        playerName: playerName,
                        playerDesc: playerDesc,
                        playerNationality: playerNationality,
                        playerPhoto: playerPhoto
                    })
                }}>
                    <Left>
                        <Thumbnail square source={{ uri: playerPhoto }} />
                    </Left>
                    <Body>
                        <Text>{playerName}</Text>
                        <Text note>{playerPosition}</Text>
                    </Body>
                </ListItem>
            )
        })
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <List>
                        {this.state.loadData ? <Spinner color='blue' /> : this.state.pemainList ? this.displayPlayers() : <Text></Text>}
                    </List>
                </ScrollView>
            </Container>
        )
    }
}

export default ListPlayers;