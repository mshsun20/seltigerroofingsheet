import State from "../../models/masters/state.js";

// Controller logics
export const createFunction = async (payload) => {
    const newState = await State.create(payload)
    if (newState) return newState;
}

export const readFunction = async () => {
    const stateDetails = await State.find().lean()
    return stateDetails;
}

export const readByIdFunction = async (id) => {
    const stateDetails = await State.findById(id);
    return stateDetails;
}

export const readByCodeFunction = async (code) => {
    const stateDetails = await State.findOne({ code });
    return stateDetails;
}

export const updateFunction = async (payload, id) => {
    const updatedState = await State.findByIdAndUpdate(
        id,
        payload,
        { returnDocument: "after" }
    )
    if (updatedState) return updatedState;
}

export const removeFunction = async (id) => {
    const removedState = await State.findByIdAndDelete(id);
    if (removedState) return removedState;
}
