import { StyleSheet } from "react-native";

export const postStyle = StyleSheet.create({
    postContainer: {
        borderBottomWidth: 10,
        borderColor: "#ddd",
        paddingBottom: 15,
        paddingTop: 10,
    },
    postHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15
    },
    postContent: {
        marginHorizontal: 15,
        fontSize: 20
    },
    image: {
        width: "100%",
        height: 200,
        marginTop: 10,
        resizeMode: "cover",
    },
    interactionsContainer: {
        marginTop: 10,
        marginHorizontal: 15
    },
    likeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeIcon: {
        width: 35,
        height: 30,
    },
    likesAmount: {
        marginStart: 10,
    },
    isLikePress: {
        tintColor: "blue"
    },
    isLikeNotPress: {
        tintColor: "gray"
    },
    likeAndExpendBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    }
});