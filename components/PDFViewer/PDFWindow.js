import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import alpha from "../../lib/Alphabet";

const styles = StyleSheet.create({
    body: {
        paddingVertical: "0.5in",
        paddingHorizontal: "0.5in",
    },
    textAlignCenter: {
        textAlign: "center",
    },
    fontWeightBold: {
        fontWeight: "bold",
    },
    baseFont: {
        fontSize: 12,
    },
    testTitle: {
        padding: "15px",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
        marginVertical: "15px",
    },
    listItem: {
        display: "flex",
        marginBottom: 10,
        fontSize: 12,
    },
    displayFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    widthHalf: {
        width: "45%",
    },
    listItemIndex: {
        marginRight: "20px",
        height: "100%",
    },
    question: {
        flex: 1,
        height: "100%",
    },
    choices: {
        marginLeft: 20,
    },
});

const PDFWindow = ({ multipleChoice, schoolName, schoolAddress, testTitle }) => {
    return (
        <Document>
            <Page size={"FOLIO"} style={styles.body}>
                <Text style={[styles.textAlignCenter, styles.fontWeightBold, styles.baseFont]}>
                    {schoolName}
                </Text>
                <Text style={[styles.textAlignCenter, styles.baseFont]}>{schoolAddress}</Text>
                <Text style={[styles.textAlignCenter, styles.testTitle, styles.baseFont]}>
                    {testTitle}
                </Text>

                <View style={[styles.displayFlex, { marginBottom: "5px" }]}>
                    <View style={[styles.widthHalf, styles.baseFont]}>
                        <Text>Name: __________________</Text>
                        <Text>Grade & Section: _________</Text>
                        <Text>Date: __________________</Text>
                    </View>
                    <View style={[styles.widthHalf, styles.baseFont]}>
                        <Text>Score: ________________</Text>
                        <Text>HPS: ___________________</Text>
                        <Text>Parent's Signature: _______</Text>
                    </View>
                </View>

                {multipleChoice.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.baseFont}>
                            <Text style={styles.listItemIndex}>___{index + 1}. </Text>
                            <Text style={styles.question}>{item.question}</Text>
                        </Text>

                        <View style={[styles.baseFont, styles.choices]}>
                            {item.choices.map((choice, index) => (
                                <Text key={index}>
                                    {alpha()[index]}. {choice}
                                </Text>
                            ))}
                        </View>
                    </View>
                ))}

                <Text style={[styles.textAlignCenter, styles.baseFont]}>-Nothing Follows-</Text>

                <Text style={styles.baseFont} break>
                    Key Answer
                </Text>
                {multipleChoice.map((item, index) => (
                    <Text style={styles.baseFont} key={index}>
                        {index + 1}. {item.answer}
                    </Text>
                ))}
            </Page>
        </Document>
    );
};

export default PDFWindow;
