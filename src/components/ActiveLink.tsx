import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...props }: ActiveLinkProps){

  const { asPath } = useRouter()

  let isActive = false

  if(shouldMatchExactHref && (asPath === props.href || asPath === props.as)){
    isActive = true
  }

  if(!shouldMatchExactHref && (asPath.startsWith(String(props.href))) || asPath.startsWith(String(props.as))) {
    isActive = true
  }

  return (
    <Link {...props}>
      {cloneElement(children, {color: isActive ? 'pink.400' : 'gray.50'})}
    </Link>
  )
}