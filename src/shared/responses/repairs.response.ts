export const repairResponses = {
    creation: {
        noPermission: {
            code:	1010,
            status: false,
            message: 'You do not have the necessary permissions to perform this action.' 
        },
        plateExists: {
            code:	1011,
            status: false,
            message: 'The plate is already registered.' 
        },
        error: {
            code:	1019,
            status: false,
            message: 'The Car repair could not be created, an error has occurred.' 
        },
        success: {
            code:	1110,
            status: true,
            message: 'The Car repair has been successfully created.' 
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
            message: 'Car repair not found.' 
        },
        error: {
            code:	1039,
            status: false,
            message: 'The Car repair(s) could not be listed, an error has occurred.' 
        },
        success: {
            code:	1130,
            status: true,
            message: 'The Car repair(s) has been successfully listed.' 
        }
    }
};
