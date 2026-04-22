import { Descriptor } from "./Descriptor";

/**
 * Remove duplicated descriptor
 * For example, A1 equals to A2
 * [A1, B, A2]
 * => filter
 * [A1, B]
 */
export const filterDuplicateDescriptor = <T extends Descriptor<any>>(descriptors: T[]) => {
    const newDescriptorList: T[] = [];
    descriptors.forEach((descriptor) => {
        const existsDescriptor = newDescriptorList.some((existDescriptor) => {
            return existDescriptor.equals(descriptor);
        });
        if (!existsDescriptor) {
            newDescriptorList.push(descriptor);
        }
    });
    return newDescriptorList;
};
