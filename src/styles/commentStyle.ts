import { StyleSheet } from "react-native";

export const commentStyle = StyleSheet.create({
    commentContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        margin: 5,
        padding: 7,
        backgroundColor: "#ddd"
    },
    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    profileIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    author: {
        fontWeight: "bold",
    },
    content: {
        marginLeft: 30,
    }
});