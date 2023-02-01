import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        marginHorizontal: "1in",
        marginVertical: "1in",
    },
    section: {
        //margin: "1in",
        padding: 10,
    },
});

const PDFWindow = ({ title }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} debug={true}>
                <View style={styles.section}>
                    <Text>{title}</Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                        repudiandae dolore quaerat fugiat unde, aperiam, tenetur aspernatur nulla
                        quis quod deleniti! Est atque deserunt debitis. Aliquam reprehenderit
                        eligendi id quisquam? Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consectetur possimus, quae doloremque doloribus at maxime dicta odit
                        expedita blanditiis adipisci explicabo sunt, suscipit, nemo illum fugit qui
                        pariatur corporis aperiam?
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                        repudiandae dolore quaerat fugiat unde, aperiam, tenetur aspernatur nulla
                        quis quod deleniti! Est atque deserunt debitis. Aliquam reprehenderit
                        eligendi id quisquam? Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consectetur possimus, quae doloremque doloribus at maxime dicta odit
                        expedita blanditiis adipisci explicabo sunt, suscipit, nemo illum fugit qui
                        pariatur corporis aperiam?
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                        repudiandae dolore quaerat fugiat unde, aperiam, tenetur aspernatur nulla
                        quis quod deleniti! Est atque deserunt debitis. Aliquam reprehenderit
                        eligendi id quisquam? Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consectetur possimus, quae doloremque doloribus at maxime dicta odit
                        expedita blanditiis adipisci explicabo sunt, suscipit, nemo illum fugit qui
                        pariatur corporis aperiam?
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                        repudiandae dolore quaerat fugiat unde, aperiam, tenetur aspernatur nulla
                        quis quod deleniti! Est atque deserunt debitis. Aliquam reprehenderit
                        eligendi id quisquam? Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consectetur possimus, quae doloremque doloribus at maxime dicta odit
                        expedita blanditiis adipisci explicabo sunt, suscipit, nemo illum fugit qui
                        pariatur corporis aperiam?
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                        repudiandae dolore quaerat fugiat unde, aperiam, tenetur aspernatur nulla
                        quis quod deleniti! Est atque deserunt debitis. Aliquam reprehenderit
                        eligendi id quisquam? Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consectetur possimus, quae doloremque doloribus at maxime dicta odit
                        expedita blanditiis adipisci explicabo sunt, suscipit, nemo illum fugit qui
                        pariatur corporis aperiam?
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                        repudiandae dolore quaerat fugiat unde, aperiam, tenetur aspernatur nulla
                        quis quod deleniti! Est atque deserunt debitis. Aliquam reprehenderit
                        eligendi id quisquam? Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consectetur possimus, quae doloremque doloribus at maxime dicta odit
                        expedita blanditiis adipisci explicabo sunt, suscipit, nemo illum fugit qui
                        pariatur corporis aperiam?
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default PDFWindow;
