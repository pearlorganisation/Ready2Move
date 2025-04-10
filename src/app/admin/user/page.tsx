import RoleRedirect from "@/components/RoleBasedComponent"

const UserPage = () => {
  return (
    <div>
      <div> <RoleRedirect role="USER" /></div>
      UserPage
    </div>
  )
}

export default UserPage