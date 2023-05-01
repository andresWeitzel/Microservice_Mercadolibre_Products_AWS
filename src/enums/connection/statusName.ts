
/**
 * @description Provides symbolic names for some error codes based on the database connection.
 * @returns the symbolic name 
 * @example  CONNECTION_REFUSED --> ECCONNREFUSED
 */
export const statusName = {
    CONNECTION_ABORTED: "ECCONNABORTED",
    CONNECTION_ALREADY_PROGRESS: "EALREADY",
    CONNECTION_REFUSED: "ECCONNREFUSED",
    CONNECTION_RESET: "ECCONNRESET",
    CONNECTION_ERROR: "ERROR",
}
