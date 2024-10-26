import { H3, Paragraph } from '@/components/theme/Typography'

import { makeSvgIcon } from '@/theme/icons'

import { StyledRoot } from './styles'

export default function IconCard({
    title,
    body,
    icon
}) {
    const Icon = (props) => makeSvgIcon(icon, props)

    return <StyledRoot>
        <div>
            <div className="icon-box">
                <Icon className="icon" color="primary" />
            </div>

            <H3 fontWeight={900} textAlign="center" mb="0.3rem">
                {title}
            </H3>

            {!!body && <Paragraph color="grey.600" textAlign="center">
                {body}
            </Paragraph>}
        </div>
    </StyledRoot>
}