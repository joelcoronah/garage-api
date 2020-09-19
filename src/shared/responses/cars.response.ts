export const carResponses = {
    creation: {
        noPermission: {
            code:	1010,
            status: false,
            message: 'You do not have the necessary permissions to perform this action.' 
        },
        plateExist: {
            code:	1011,
            status: false,
            message: 'The plate is already registered.' 
        },
        error: {
            code:	1019,
            status: false,
            message: 'The Car could not be created, an error has occurred.' 
        },
        success: {
            code:	1110,
            status: true,
            message: 'The Car has been successfully created.' 
        }
    },
    list: {
        noPermission: {
            code:	1030,
            status: false,
            message: 'You do not have the necessary permissions to perform this action.' 
        },
        notFound: {
            code:	1031,
            status: false,
            message: 'Car not found.' 
        },
        error: {
            code:	1039,
            status: false,
            message: 'The Car(s) could not be listed, an error has occurred.' 
        },
        success: {
            code:	1130,
            status: true,
            message: 'The Car(s) has been successfully listed.' 
        }
    }
};
