export const activateUserMail = (resetLink: string) => `
<div>
    <div>Your account activated</div>
    <div><a href="${resetLink}">Set password</a></div>
</div>
`;
